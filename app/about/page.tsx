"use client";

import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600">
            Connecting Ambitions with Opportunities — Your Path to Success
            Starts Here!
          </p>
        </header>

        {/* Content Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Mission Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              At <span className="font-semibold">Qist-Bazaar</span>, our mission
              is to bridge the gap between skilled professionals and top-notch
              companies. We empower job seekers to find their ideal roles while
              providing businesses with the best talent to drive their success.
              We believe in creating a world where everyone has access to equal
              opportunities, paving the way for a brighter future.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We envision a future where job hunting is seamless, efficient, and
              rewarding. By leveraging advanced technology and human expertise,
              we aim to become the most trusted platform for connecting dreams
              with opportunities.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Integrity</h3>
              <p className="text-gray-600 mt-4">
                We uphold the highest standards of honesty and transparency in
                everything we do.
              </p>
            </div>
            {/* Value 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Innovation</h3>
              <p className="text-gray-600 mt-4">
                We continuously improve our platform with cutting-edge solutions
                to simplify the job search process.
              </p>
            </div>
            {/* Value 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Diversity</h3>
              <p className="text-gray-600 mt-4">
                We celebrate diversity and inclusivity, ensuring equal
                opportunities for all.
              </p>
            </div>
            {/* Value 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Empowerment</h3>
              <p className="text-gray-600 mt-4">
                Empowering individuals and businesses to achieve their full
                potential is our driving force.
              </p>
            </div>
            {/* Value 5 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Collaboration</h3>
              <p className="text-gray-600 mt-4">
                We foster collaboration to create lasting connections and
                partnerships.
              </p>
            </div>
            {/* Value 6 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Excellence</h3>
              <p className="text-gray-600 mt-4">
                Excellence drives us to deliver outstanding experiences for our
                users.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">
            Join Us on Our Journey
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Whether you're a job seeker or an employer, we invite you to explore
            our platform and discover endless possibilities. Together, we can
            build a thriving community of talented professionals and innovative
            organizations.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-lg hover:bg-blue-700">
            Learn More
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
