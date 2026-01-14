export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Terms of Service</h1>
        <p className="text-lg text-stone-600">Last updated: January 14, 2026</p>
      </div>

      <div className="prose prose-stone max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Acceptance of Terms</h2>
          <p className="mb-4">
            Welcome to Bookworm. These Terms of Service ("Terms", "Terms of Service") govern your use of 
            our website, mobile application, and any related services provided by Bookworm ("Service").
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with 
            any part of the terms, then you may not access the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Accounts</h2>
          <p className="mb-4">
            When you create an account with us, you must provide accurate and complete information. You are 
            responsible for maintaining the security of your account and for all activities that occur under 
            your account.
          </p>
          <p>
            You agree to notify us immediately of any unauthorized access to or use of your account or any 
            other breach of security. We may suspend or terminate your account if you fail to comply with 
            these security obligations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Intellectual Property</h2>
          <p className="mb-4">
            The Service and its original content, features, and functionality are and will remain the 
            exclusive property of Bookworm and its licensors. The Service is protected by copyright, 
            trademark, and other laws of both the United States and foreign countries.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with any product or service 
            without the prior written consent of Bookworm.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">User Content</h2>
          <p className="mb-4">
            Our Service allows you to post, link, store, share and otherwise make available certain 
            information, text, graphics, videos, or other material ("Content"). You are responsible 
            for the Content that you post to the Service.
          </p>
          <p>
            By posting Content to the Service, you grant us the right and license to use, modify, 
            publicly perform, publicly display, reproduce, and distribute such Content on and through 
            the Service. You retain any and all of your rights to any Content you submit, post or 
            display on or through the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Prohibited Uses</h2>
          <p className="mb-4">
            You may use the Service only for lawful purposes and in accordance with these Terms. You 
            agree not to use the Service:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>In any way that violates any applicable national or international law or regulation</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material</li>
            <li>To impersonate or attempt to impersonate the Company or any employee</li>
            <li>In any way that infringes upon the rights of others</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Links to Other Websites</h2>
          <p className="mb-4">
            Our Service may contain links to third-party websites or services that are not owned or 
            controlled by Bookworm.
          </p>
          <p>
            Bookworm has no control over and assumes no responsibility for the content, privacy policies, 
            or practices of any third-party websites or services. We do not warrant the offerings of any 
            of these entities or their websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account immediately, without prior notice or liability, 
            for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will cease. If you wish to terminate your 
            account, you may simply discontinue using the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall Bookworm, nor its directors, employees, partners, agents, suppliers, or 
            affiliates, be liable for any indirect, incidental, special, consequential or punitive 
            damages, including without limitation, loss of profits, data, use, goodwill, or other 
            intangible losses, resulting from your access to or use of or inability to access or use 
            the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed and construed in accordance with the laws of the United States, 
            without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver 
            of those rights. If any provision of these Terms is held to be invalid or unenforceable by 
            a court, the remaining provisions of these Terms will remain in effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Changes to These Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material, we will try to provide at least 30 days' notice prior to any 
            new terms taking effect.
          </p>
          <p>
            What constitutes a material change will be determined at our sole discretion. By continuing 
            to access or use our Service after those revisions become effective, you agree to be bound 
            by the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>By email: legal@bookworm.com</li>
            <li>Through our <a href="/contact" className="text-amber-600 hover:underline">Contact Us</a> page</li>
          </ul>
        </section>
      </div>
    </div>
  );
}