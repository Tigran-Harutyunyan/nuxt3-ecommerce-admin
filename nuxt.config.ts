// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vee-validate/nuxt',
    '@nuxtjs/cloudinary',
    '@fixers/nuxt-stripe'
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  build: {
    transpile: ['vue-clerk', '@clerk/clerk-js', "@nuxt/image"],
  },
  runtimeConfig: {
    public: {
      clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      appUrl: process.env.NUXT_PUBLIC_APP_URL
    },
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
    storeUrl: process.env.FRONTEND_STORE_URL,
    stripeKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
})