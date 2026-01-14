"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Bookworm?",
      answer: "Bookworm is your personalized digital library where you can track your reading journey, discover new books, and join a community of book lovers. You can maintain reading lists, write reviews, set reading goals, and get personalized recommendations."
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your name, email address, and password, then submit the form. Once registered, you can start building your personal library."
    },
    {
      question: "How can I track my reading progress?",
      answer: "Bookworm allows you to organize books into three shelves: 'Want to Read', 'Currently Reading', and 'Read'. You can move books between these shelves as you progress through your reading journey. You can also set annual reading goals and track your progress."
    },
    {
      question: "Can I write reviews for books?",
      answer: "Yes! Once you've read a book, you can write detailed reviews and rate books from 1 to 5 stars. Your reviews help other members of the community discover great books and share your thoughts on what you've read."
    },
    {
      question: "How are book recommendations generated?",
      answer: "Our recommendation system suggests books based on your reading history, ratings, and preferences. The more you interact with the platform, the more personalized your recommendations become."
    },
    {
      question: "Can I access Bookworm on mobile devices?",
      answer: "Yes! Bookworm is built with responsive design, allowing you to access your library seamlessly on desktops, tablets, and smartphones. Simply visit our website from your mobile browser."
    },
    {
      question: "How do I reset my password?",
      answer: "If you've forgotten your password, navigate to the login page and click on 'Forgot Password?' (Note: This feature may be implemented in a future update). Alternatively, you can contact our support team for assistance."
    },
    {
      question: "Is my personal information secure?",
      answer: "We take your privacy seriously. All personal information is securely stored and encrypted. We never share your personal data with third parties without your consent. For more details, please review our Privacy Policy."
    },
    {
      question: "How can I contribute to the community?",
      answer: "There are many ways to engage with our community: write thoughtful book reviews, rate books accurately, participate in discussions, share reading tips, and recommend books to other readers. Your contributions help improve the experience for everyone."
    },
    {
      question: "What are the tutorials about?",
      answer: "Our tutorials section features educational content related to reading and literature. You'll find videos on reading tips, writing advice, book reviews, library tours, and other topics to enhance your reading experience."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Find answers to common questions about using Bookworm and managing your digital library.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm">
            <button
              className="w-full flex justify-between items-center p-6 text-left hover:bg-amber-50 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium text-stone-900">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 pt-2 border-t border-stone-100">
                <p className="text-stone-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Still have questions?</h2>
        <p className="text-stone-600 mb-6">
          Our support team is here to help you with any additional questions you might have.
        </p>
        <a
          href="/contact"
          className="inline-block bg-amber-600 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}