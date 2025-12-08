import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Product type for blog posts
interface BlogProduct {
  title: string;
  price: string;
  rating: number;
  imageUrl: string;
  affiliateLink: string; // Your Amazon affiliate link goes here
}

// Blog post data with embedded products
const blogPostsData: Record<string, {
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  content: string[];
  products: BlogProduct[];
}> = {
  "top-10-smart-home-devices-2025": {
    title: "Top 10 Smart Home Devices for 2025",
    date: "2025-01-15",
    category: "Home & Safety",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&auto=format",
    content: [
      "Smart home technology has evolved dramatically, making our homes more connected, efficient, and secure than ever before. In this guide, we explore the top smart home devices that are transforming how we live in 2025.",
      "From intelligent thermostats that learn your preferences to security cameras with AI-powered detection, these devices represent the cutting edge of home automation. Whether you're just starting your smart home journey or looking to upgrade your existing setup, these products offer the best combination of features, reliability, and value.",
      "We've tested each of these devices extensively to bring you honest recommendations based on real-world performance."
    ],
    products: [
      {
        title: "Amazon Echo Dot (5th Gen) - Smart Speaker with Alexa",
        price: "$49.99",
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&auto=format",
        affiliateLink: "https://www.amazon.com/dp/B09B8V1LZ3?tag=moderntechs0c-20"
      },
      {
        title: "Ring Video Doorbell 4 - Smart Wireless Doorbell Camera",
        price: "$199.99",
        rating: 4.5,
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format",
        affiliateLink: "https://www.amazon.com/dp/B08JNR77QY?tag=moderntechs0c-20"
      },
      {
        title: "Nest Learning Thermostat - Programmable Smart Thermostat",
        price: "$249.00",
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1567925086983-a5752763a6e2?w=400&auto=format",
        affiliateLink: "https://www.amazon.com/dp/B0131RG6VK?tag=moderntechs0c-20"
      },
      {
        title: "Philips Hue Smart Bulb Starter Kit",
        price: "$179.99",
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format",
        affiliateLink: "https://www.amazon.com/dp/B07QV9XB87?tag=moderntechs0c-20"
      }
    ]
  },
  "best-gaming-monitors-under-500": {
    title: "Best Gaming Monitors Under $500",
    date: "2025-01-10",
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=1200&auto=format",
    content: [
      "Finding the perfect gaming monitor can be overwhelming with so many options on the market. We've narrowed down the best gaming monitors under $500 that deliver exceptional performance without breaking the bank.",
      "Whether you're a competitive esports player who needs lightning-fast refresh rates or a casual gamer who prioritizes stunning visuals, there's a monitor on this list for you.",
      "All monitors listed here have been tested for color accuracy, response time, and overall gaming experience."
    ],
    products: [
      {
        title: "ASUS VG27AQ1A 27\" Gaming Monitor 170Hz 1ms",
        price: "$299.00",
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format",
        affiliateLink: "https://www.amazon.com/dp/B088HM74VD?tag=moderntechs0c-20"
      },
      {
        title: "LG 27GP850-B UltraGear Gaming Monitor",
        price: "$449.99",
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&auto=format",
        affiliateLink: "https://www.amazon.com/dp/B093MTSTKD?tag=moderntechs0c-20"
      },
      {
        title: "Samsung Odyssey G5 34\" Curved Gaming Monitor",
        price: "$399.99",
        rating: 4.5,
        imageUrl: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=400&auto=format",
        affiliateLink: "https://www.amazon.com/dp/B08FF3HDW5?tag=moderntechs0c-20"
      }
    ]
  }
};

// Default post for slugs that don't exist yet
const defaultPost = {
  title: "Coming Soon",
  date: new Date().toISOString().split('T')[0],
  category: "General",
  imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format",
  content: ["This blog post is coming soon. Check back later for our full review and product recommendations!"],
  products: []
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug && blogPostsData[slug] ? blogPostsData[slug] : defaultPost;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-12 -mt-32 relative z-10">
        <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">{post.title}</h1>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-foreground/80 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Products Section */}
          {post.products.length > 0 && (
            <section className="mt-12">
              <h2 className="text-3xl font-bold font-display mb-8 text-center">
                Our Top Picks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {post.products.map((product, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-card transition-all duration-300 group">
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{product.price}</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-medium">{product.rating}/5</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-gradient-christmas hover:shadow-elegant"
                        asChild
                      >
                        <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                          Buy on Amazon <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Affiliate Disclosure */}
          <div className="mt-12 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
            <strong>Affiliate Disclosure:</strong> As an Amazon Associate, Modern Tech LLC earns from qualifying purchases. 
            When you click links to Amazon and make a purchase, we may receive a small commission at no extra cost to you.
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
