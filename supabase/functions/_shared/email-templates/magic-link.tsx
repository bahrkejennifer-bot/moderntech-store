/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

const LOGO_URL = 'https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/email-assets/mt-monogram-logo.png'

export const MagicLinkEmail = ({
  siteName,
  confirmationUrl,
}: MagicLinkEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your login link for Modern Tech</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={LOGO_URL} alt="Modern Tech" width="48" height="48" style={logo} />
        <Text style={brandName}>Modern Tech LLC</Text>
        <Hr style={rule} />
        <Heading style={h1}>Your login link</Heading>
        <Text style={text}>
          Click the button below to log in to Modern Tech. This link will expire shortly.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Log In
        </Button>
        <Hr style={rule} />
        <Text style={footer}>
          If you didn't request this link, you can safely ignore this email.
        </Text>
        <Text style={brandFooter}>Tech today · Trend tomorrow</Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const main = { backgroundColor: '#f7f5f3', fontFamily: 'Georgia, serif' }
const container = { padding: '48px 40px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }
const logo = { display: 'block' as const, margin: '0 auto 12px' }
const brandName = { fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: '#b0a8a0', textAlign: 'center' as const, margin: '0 0 24px' }
const rule = { borderColor: '#e8e3de', margin: '0 20px 32px' }
const h1 = { fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: '400' as const, fontStyle: 'italic' as const, color: '#2c2825', margin: '0 0 20px', textAlign: 'center' as const }
const text = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: '15px', color: '#5a5550', lineHeight: '1.7', margin: '0 0 20px' }
const button = { backgroundColor: '#c8a0a0', color: '#ffffff', fontFamily: "'Courier New', monospace", fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, textDecoration: 'none', padding: '16px 40px', display: 'block' as const, textAlign: 'center' as const, margin: '0 auto 32px' }
const footer = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: '12px', color: '#b0a8a0', margin: '0 0 8px', textAlign: 'center' as const }
const brandFooter = { fontFamily: "'Courier New', monospace", fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#b0a8a0', textAlign: 'center' as const, margin: '0' }
