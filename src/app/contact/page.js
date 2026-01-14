"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { HiMail, HiPhone, HiLocationMarker, HiUser, HiBriefcase, HiLightBulb, HiChatAlt } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

export default function ContactPage() {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your backend
    // For now, we'll just show a success message
    toast.success('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactOptions = [
    {
      icon: <HiMail className="h-6 w-6" />,
      title: 'Email Us',
      description: 'Send us a message and we\'ll respond as soon as possible',
      detail: 'support@bookworm.com',
      href: 'mailto:support@bookworm.com'
    },
    {
      icon: <HiPhone className="h-6 w-6" />,
      title: 'Call Us',
      description: 'Mon-Fri from 9am to 5pm',
      detail: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: <HiLocationMarker className="h-6 w-6" />,
      title: 'Visit Us',
      description: 'Come visit our office during business hours',
      detail: '123 Book Street, Library City, LC 12345',
      href: '#'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-stone-900 font-serif mb-4">Get in Touch</h1>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto">
          Have questions about Bookworm? Need help with your account? Our team is here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={!!user}
                  className={`block w-full pl-10 pr-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${user ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                  placeholder={user ? user.name : "Your name"}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={!!user}
                  className={`block w-full pl-10 pr-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${user ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                  placeholder={user ? user.email : "your.email@example.com"}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="block w-full px-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Select a subject</option>
                <option value="account">Account Support</option>
                <option value="feedback">Feedback</option>
                <option value="feature-request">Feature Request</option>
                <option value="bug-report">Bug Report</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="block w-full px-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-700 text-white py-3 px-4 rounded-lg hover:bg-amber-800 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Contact Information</h2>
          
          <div className="space-y-6 mb-10">
            {contactOptions.map((option, index) => (
              <div key={index} className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex-shrink-0 p-2 bg-amber-100 rounded-lg text-amber-700">
                  {option.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-stone-900">{option.title}</h3>
                  <p className="text-stone-600 mt-1">{option.description}</p>
                  <a 
                    href={option.href} 
                    className="text-amber-700 hover:text-amber-800 font-medium mt-2 inline-block"
                  >
                    {option.detail}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
            <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center">
              <HiLightBulb className="mr-2 text-amber-600" />
              Frequently Asked Questions
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-amber-700 hover:text-amber-800 font-medium">How do I reset my password?</a>
              </li>
              <li>
                <a href="#" className="text-amber-700 hover:text-amber-800 font-medium">How can I update my reading goal?</a>
              </li>
              <li>
                <a href="#" className="text-amber-700 hover:text-amber-800 font-medium">Can I suggest a book to add to the library?</a>
              </li>
              <li>
                <a href="#" className="text-amber-700 hover:text-amber-800 font-medium">How do I report inappropriate content?</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}