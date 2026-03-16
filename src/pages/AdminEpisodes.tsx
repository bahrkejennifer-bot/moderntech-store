import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff, Star, Video, Headphones, Upload, ImageIcon, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

interface Episode {
  id: string;
  episode_code: string;
  title: string;
  description: string | null;
  type: string;
  day_theme: string | null;
  thumbnail_url: string | null;
  youtube_url: string | null;
  spotify_url: string | null;
  apple_url: string | null;
  story_html: string | null;
  transcript_html: string | null;
  quote_text: string | null;
  quote_author: string | null;
  takeaways: string[] | null;
  is_published: boolean | null;
  is_featured: boolean | null;
  has_cc: boolean | null;
  has_transcript: boolean | null;
  publish_date: string | null;
}

const emptyEpisode: Omit<Episode, "id"> = {
  episode_code: "",
  title: "",
  description: "",
  type: "video",
  day_theme: "Motivational Monday",
  thumbnail_url: "",
  youtube_url: "",
  spotify_url: "",
  apple_url: "",
  story_html: "",
  transcript_html: "",
  quote_text: "",
  quote_author: "",
  takeaways: [],
  is_published: false,
  is_featured: false,
  has_cc: false,
  has_transcript: false,
  publish_date: null,
};

const dayThemes = [
  "Motivational Monday",
  "Tech Tuesday",
  "Workflow Wednesday",
  "Health Tech Thursday",
  "Fun Tech Friday",
  "Strategy Saturday",
  "Solace Sunday",
];

const AdminEpisodes = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<Partial<Episode> | null>(null);
  const [takeawayInput, setTakeawayInput] = useState("");

  const { data: episodes = [], isLoading } = useQuery({
    queryKey: ["admin-episodes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("episodes")
        .select("*")
        .order("publish_date", { ascending: false });
      if (error) throw error;
      return data as Episode[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (ep: Partial<Episode>) => {
      const payload = {
        episode_code: ep.episode_code,
        title: ep.title,
        description: ep.description || null,
        type: ep.type || "video",
        day_theme: ep.day_theme || null,
        thumbnail_url: ep.thumbnail_url || null,
        youtube_url: ep.youtube_url || null,
        spotify_url: ep.spotify_url || null,
        apple_url: ep.apple_url || null,
        story_html: ep.story_html || null,
        transcript_html: ep.transcript_html || null,
        quote_text: ep.quote_text || null,
        quote_author: ep.quote_author || null,
        takeaways: ep.takeaways || [],
        is_published: ep.is_published ?? false,
        is_featured: ep.is_featured ?? false,
        has_cc: ep.has_cc ?? false,
        has_transcript: ep.has_transcript ?? false,
        publish_date: ep.publish_date || null,
        updated_at: new Date().toISOString(),
      };

      if (ep.id) {
        const { error } = await supabase.from("episodes").update(payload).eq("id", ep.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("episodes").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-episodes"] });
      setDialogOpen(false);
      setEditingEpisode(null);
      toast({ title: "Episode saved" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("episodes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-episodes"] });
      toast({ title: "Episode deleted" });
    },
  });

  const openNew = () => {
    setEditingEpisode({ ...emptyEpisode });
    setTakeawayInput("");
    setDialogOpen(true);
  };

  const openEdit = (ep: Episode) => {
    setEditingEpisode({ ...ep });
    setTakeawayInput("");
    setDialogOpen(true);
  };

  const addTakeaway = () => {
    if (!takeawayInput.trim() || !editingEpisode) return;
    setEditingEpisode({
      ...editingEpisode,
      takeaways: [...(editingEpisode.takeaways || []), takeawayInput.trim()],
    });
    setTakeawayInput("");
  };

  const removeTakeaway = (index: number) => {
    if (!editingEpisode) return;
    setEditingEpisode({
      ...editingEpisode,
      takeaways: (editingEpisode.takeaways || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <Link
          to="/admin/command-center"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3 w-3" /> Command Center
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl tracking-tight" style={{ fontWeight: 500 }}>
              Episode Manager
            </h1>
            <p className="font-mono text-[10px] text-muted-foreground mt-1">
              Add, edit, and publish video & podcast episodes
            </p>
          </div>
          <Button onClick={openNew} className="gap-2">
            <Plus className="h-4 w-4" /> New Episode
          </Button>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground font-mono text-sm">Loading…</p>
        ) : (
          <div className="border border-border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-mono text-[10px] uppercase">Code</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase">Title</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase">Type</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase">Theme</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase">Status</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {episodes.map((ep) => (
                  <TableRow key={ep.id}>
                    <TableCell className="font-mono text-xs">
                      <span className="flex items-center gap-1.5">
                        {ep.type === "video" ? <Video className="h-3 w-3" /> : <Headphones className="h-3 w-3" />}
                        {ep.episode_code}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-xs max-w-[300px] truncate">
                      {ep.is_featured && <Star className="h-3 w-3 inline mr-1 text-yellow-500" />}
                      {ep.title}
                    </TableCell>
                    <TableCell className="font-mono text-[10px] uppercase">{ep.type}</TableCell>
                    <TableCell className="font-mono text-[10px]">{ep.day_theme || "—"}</TableCell>
                    <TableCell>
                      {ep.is_published ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-green-500">
                          <Eye className="h-3 w-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                          <EyeOff className="h-3 w-3" /> Draft
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(ep)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm("Delete this episode?")) deleteMutation.mutate(ep.id);
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {episodes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground font-mono text-sm py-8">
                      No episodes yet. Click "New Episode" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingEpisode?.id ? "Edit Episode" : "New Episode"}
            </DialogTitle>
          </DialogHeader>

          {editingEpisode && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] uppercase text-muted-foreground">Episode Code *</label>
                  <Input
                    value={editingEpisode.episode_code || ""}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, episode_code: e.target.value })}
                    placeholder="MTL-V005"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase text-muted-foreground">Type</label>
                  <Select
                    value={editingEpisode.type || "video"}
                    onValueChange={(v) => setEditingEpisode({ ...editingEpisode, type: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="podcast">Podcast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase text-muted-foreground">Title *</label>
                <Input
                  value={editingEpisode.title || ""}
                  onChange={(e) => setEditingEpisode({ ...editingEpisode, title: e.target.value })}
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase text-muted-foreground">Description</label>
                <Textarea
                  value={editingEpisode.description || ""}
                  onChange={(e) => setEditingEpisode({ ...editingEpisode, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] uppercase text-muted-foreground">Day Theme</label>
                  <Select
                    value={editingEpisode.day_theme || ""}
                    onValueChange={(v) => setEditingEpisode({ ...editingEpisode, day_theme: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {dayThemes.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase text-muted-foreground">Publish Date</label>
                  <Input
                    type="date"
                    value={editingEpisode.publish_date ? editingEpisode.publish_date.slice(0, 10) : ""}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, publish_date: e.target.value || null })}
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase text-muted-foreground">Thumbnail URL</label>
                <Input
                  value={editingEpisode.thumbnail_url || ""}
                  onChange={(e) => setEditingEpisode({ ...editingEpisode, thumbnail_url: e.target.value })}
                  placeholder="/thumbnails/mtl-v005-thumbnail.jpg"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-mono text-[10px] uppercase text-muted-foreground">YouTube URL</label>
                  <Input
                    value={editingEpisode.youtube_url || ""}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, youtube_url: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase text-muted-foreground">Spotify URL</label>
                  <Input
                    value={editingEpisode.spotify_url || ""}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, spotify_url: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase text-muted-foreground">Apple URL</label>
                  <Input
                    value={editingEpisode.apple_url || ""}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, apple_url: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase text-muted-foreground">Quote</label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    className="col-span-2"
                    value={editingEpisode.quote_text || ""}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, quote_text: e.target.value })}
                    placeholder="Quote text"
                  />
                  <Input
                    value={editingEpisode.quote_author || ""}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, quote_author: e.target.value })}
                    placeholder="Author"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase text-muted-foreground">Story (HTML)</label>
                <Textarea
                  value={editingEpisode.story_html || ""}
                  onChange={(e) => setEditingEpisode({ ...editingEpisode, story_html: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase text-muted-foreground">Transcript (HTML)</label>
                <Textarea
                  value={editingEpisode.transcript_html || ""}
                  onChange={(e) => setEditingEpisode({ ...editingEpisode, transcript_html: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Takeaways */}
              <div>
                <label className="font-mono text-[10px] uppercase text-muted-foreground">Key Takeaways</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={takeawayInput}
                    onChange={(e) => setTakeawayInput(e.target.value)}
                    placeholder="Add a takeaway…"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTakeaway())}
                  />
                  <Button variant="outline" size="sm" onClick={addTakeaway}>Add</Button>
                </div>
                <ul className="mt-2 space-y-1">
                  {(editingEpisode.takeaways || []).map((t, i) => (
                    <li key={i} className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                      <span className="flex-1">{t}</span>
                      <button onClick={() => removeTakeaway(i)} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground">
                  <Switch
                    checked={editingEpisode.is_published ?? false}
                    onCheckedChange={(v) => setEditingEpisode({ ...editingEpisode, is_published: v })}
                  />
                  Published
                </label>
                <label className="flex items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground">
                  <Switch
                    checked={editingEpisode.is_featured ?? false}
                    onCheckedChange={(v) => setEditingEpisode({ ...editingEpisode, is_featured: v })}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground">
                  <Switch
                    checked={editingEpisode.has_cc ?? false}
                    onCheckedChange={(v) => setEditingEpisode({ ...editingEpisode, has_cc: v })}
                  />
                  CC / Subtitles
                </label>
                <label className="flex items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground">
                  <Switch
                    checked={editingEpisode.has_transcript ?? false}
                    onCheckedChange={(v) => setEditingEpisode({ ...editingEpisode, has_transcript: v })}
                  />
                  Transcript
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button
                  onClick={() => saveMutation.mutate(editingEpisode)}
                  disabled={!editingEpisode.episode_code || !editingEpisode.title || saveMutation.isPending}
                >
                  {saveMutation.isPending ? "Saving…" : "Save Episode"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEpisodes;
