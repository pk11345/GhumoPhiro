// HomeContent.jsx
import React from "react";

const HomeContent = () => {
    const destinations = [
        {
          name: "Rishikesh",
          image: "https://images.unsplash.com/photo-1720819029162-8500607ae232?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          name: "Shimla",
          image: "https://images.unsplash.com/photo-1657894736581-ccc35d62d9e2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          name: "Manali",
          image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?q=80&w=1501&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ];
      

  return (
    <div className="text-white ">
      {/* Hero Section */}
      <section className="relative h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hotel Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-purple-700 bg-white/70 p-8 rounded-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
            <p className="text-lg md:text-xl font-semibold italic text-red-700">Book luxury hotels, resorts, and stays at the best prices</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 md:px-20 ">
        <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
        <p className="max-w-3xl mx-auto text-center text-lg font-semibold text-purple-600 bg-white/80 p-3 rounded-2xl">
          At GhumoPhiro, we make hotel booking seamless and stress-free. Whether you’re planning a
          vacation or a business trip, our platform offers curated stays across top-rated hotels and
          unique locations. With 24/7 support and user-friendly features, we’re here to make every journey
          comfortable.
        </p>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 md:px-20 ">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Destinations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <img src={dest.image} alt={dest.name} className="w-full h-60 object-cover" />
              <div className="p-4 text-center bg-white">
                <h3 className="text-xl font-semibold text-amber-500 italic">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

  
      {/* bg-gradient-to-r from-[#79a2cc] to-[#2e61a5] */}
{/* Testimonials Section - Updated */}
<section className="py-16 px-4 md:px-20 ">
  <h2 className="text-4xl font-bold text-center mb-12 text-white">What Our Guests Say</h2>
  <div className="grid md:grid-cols-3 gap-8">
    {[
      {
        name: "Aarav Mehta",
        review:
          "Amazing experience! The room was clean, the staff were very helpful, and the booking process was smooth.",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      {
        name: "Sara Khan",
        review:
          "I found a perfect getaway spot at a great price. Will definitely use GhumoPhiro again for my next trip.",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        name: "Rohan Das",
        review:
          "The site is easy to use and has great deals. I had zero issues with the booking or check-in.",
        image: "https://randomuser.me/api/portraits/men/34.jpg",
      },
    ].map((testimonial, index) => (
      <div
        key={index}
        className="bg-white p-6 rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
      >
        <div className="flex items-center gap-4 mb-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
            <div className="flex text-yellow-400 text-sm">
              ★★★★★
              {/* Alternatively use <FaStar /> multiple times if using react-icons */}
            </div>
          </div>
        </div>
        <p className="text-gray-700 italic">"{testimonial.review}"</p>
      </div>
    ))}
  </div>
</section>

{/* Contact Us + List Your Property Section */}
<section className="py-16 px-4 md:px-20 ">
  <h2 className="text-3xl font-bold text-center mb-6 text-white">Get in Touch</h2>
  <p className="max-w-2xl mx-auto text-center text-lg mb-12">
    Have questions, suggestions, or want to collaborate? We'd love to hear from you!
  </p>

  <div className="max-w-3xl mx-auto grid gap-6">
    <form className="grid gap-4 bg-[#f8fafc] p-6 rounded-xl shadow-lg">
      <input
        type="text"
        placeholder="Your Name"
        className="p-3 border border-gray-300 rounded-md text-black"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="p-3 border border-gray-300 rounded-md text-black"
      />
      <textarea
        placeholder="Your Message"
        rows="4"
        className="p-3 border border-gray-300 rounded-md text-black"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Send Message
      </button>
    </form>

    <div className="text-center mt-12">
      <h3 className="text-2xl font-bold mb-4 text-white">List Your Property With Us</h3>
      <p className="text-lg mb-4">
        Own a hotel, homestay, or unique property? Partner with GhumoPhiro to reach thousands of travelers!
      </p>
      <button className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition">
        Become a Partner
      </button>
    </div>
  </div>
</section>

    </div>
  );
};

export default HomeContent;
