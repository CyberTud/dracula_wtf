export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-serif font-bold text-blood-400 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-serif text-blood-400 mb-4">Data Collection</h2>
          <p>
            Dracula.wtf is designed with privacy in mind. We do not store or persist any user text by default.
            All text analysis is performed in memory and discarded immediately after processing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-blood-400 mb-4">Optional Leaderboard</h2>
          <p>
            If you choose to opt-in to the public leaderboard feature, we store only:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>A unique result ID</li>
            <li>Your overall vampire score</li>
            <li>The bucket classification</li>
            <li>The analysis mode used</li>
            <li>A truncated version of the roast (maximum 140 characters)</li>
          </ul>
          <p className="mt-2">
            We never store your original text, even when you opt-in to the leaderboard.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-blood-400 mb-4">Third-Party Services</h2>
          <p>
            When AI-powered roasts are enabled, text may be sent to third-party AI providers (Anthropic or OpenAI)
            for processing. These providers process the text according to their respective privacy policies but do not
            retain the data for training purposes when using their API services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-blood-400 mb-4">Analytics</h2>
          <p>
            We use privacy-friendly analytics to track page views and basic interaction events. No personally
            identifiable information is collected through analytics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-blood-400 mb-4">Cookies</h2>
          <p>
            Dracula.wtf uses only essential cookies necessary for the application to function. We do not use
            tracking cookies or advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-blood-400 mb-4">Data Retention</h2>
          <p>
            Analysis results are temporarily cached in server memory for performance reasons and are automatically
            cleared after a short period. No permanent storage of user data occurs unless explicitly opted-in for
            the leaderboard feature.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-blood-400 mb-4">Contact</h2>
          <p>
            For any privacy-related questions or concerns, please contact us through the GitHub repository
            linked in the footer.
          </p>
        </section>

        <section className="pt-8 border-t border-charcoal-800">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  )
}