import React from "react";

function About() {
  return (
    <div className="flex flex-col text-gray-800 bg-gray-50">
      <main className="container px-6 py-12 mx-auto">
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Who We Are</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            We are a team of passionate individuals committed to providing the
            best services and solutions to our customers. With years of
            experience in our respective fields, we bring a wealth of knowledge
            and expertise to every project we undertake.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Our mission is to deliver high-quality products and services that
            exceed our clients' expectations. We aim to foster a collaborative
            environment, where innovation and creativity thrive, to ensure that
            we are always at the forefront of our industry.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Our Values</h2>
          <ul className="pl-6 text-lg text-gray-600 list-disc">
            <li>
              Integrity: We uphold the highest standards of honesty and
              transparency in everything we do.
            </li>
            <li>
              Innovation: We embrace creativity and technology to solve complex
              challenges.
            </li>
            <li>
              Customer Focus: Our clients are at the heart of everything we do,
              and their satisfaction drives us to succeed.
            </li>
            <li>
              Collaboration: We believe that working together as a team leads to
              greater success.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default About;
