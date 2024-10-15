import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountUp = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / duration, 1);
      setCount(Math.floor(progressPercentage * end));
      if (progressPercentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [end, duration]);

  return <span>{count}</span>;
};

const Card = ({ children, className }) => (
  <motion.div
    className={`bg-white rounded-lg shadow-md p-6 ${className}`}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {children}
  </motion.div>
);

const Badge = ({ children }) => (
  <span className="inline-block bg-pink-100 text-pink-300 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
    {children}
  </span>
);

const AboutUsSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="bg-gradient-to-b from-pink-100 to-purple-100 py-20 px-4 pt-44">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.3 } }
        }}
      >
        <motion.h1 
          className="text-5xl font-bold text-center mb-8 text-purple-800"
          variants={fadeInUp}
        >
          About Our Extraordinary Brand
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div variants={fadeInUp}>
            <Card>
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-pink-700">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Our Story
              </h2>
              <p className="mb-4 text-gray-700">
                Founded in 2010, our journey began with a passion for creating exceptional products that enhance everyday life. 
                What started as a small workshop has grown into a global brand, but our commitment to quality and innovation remains unchanged.
              </p>
              <p className="text-gray-700">
                Today, we're proud to serve customers in over 50 countries, bringing our unique blend of style and substance 
                to discerning individuals who appreciate the finer things in life.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className="h-full">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-pink-700">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Our Mission
              </h2>
              <p className="text-gray-700">
                Our mission is to provide our customers with exceptional quality, timeless style, and unparalleled customer service. 
                We believe in creating products that not only meet but exceed expectations, enhancing the lives of our customers in both big and small ways.
              </p>
            </Card>
          </motion.div>
        </div>
        
        <motion.div variants={fadeInUp} className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center text-purple-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Customer First", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
              { title: "Excellence", icon: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" },
              { title: "Innovation", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { title: "Sustainability", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
            ].map((value, index) => (
              <Card key={index} className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                </svg>
                <h3 className="text-xl font-semibold mb-2 text-purple-700">{value.title}</h3>
                <p className="text-gray-600">Committed to upholding the highest standards in everything we do.</p>
              </Card>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center text-purple-800">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { title: "Happy Customers", count: 100000 },
              { title: "Countries Served", count: 50 },
              { title: "Team Members", count: 500 },
              { title: "Products Sold", count: 1000000 }
            ].map((achievement, index) => (
              <Card key={index}>
                <div className="text-4xl font-bold text-pink-600 mb-2">
                  <CountUp end={achievement.count} duration={2000} />+
                </div>
                <Badge>{achievement.title}</Badge>
              </Card>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <h2 className="text-3xl font-semibold mb-6 text-center text-purple-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Jane Doe", role: "Founder & CEO", bio: "Visionary leader with 15+ years in the industry.", image: "/Images/Person.png" },
              { name: "John Smith", role: "Head of Design", bio: "Award-winning designer with a passion for innovation.", image: "/Images/Person.png" },
              { name: "Emily Brown", role: "Customer Experience Lead", bio: "Dedicated to creating delightful customer journeys.", image: "/Images/Person.png" }
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1 text-purple-700">{member.name}</h3>
                <p className="text-pink-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-center text-purple-800">Our Commitment to You</h2>
          <Card className="text-center">
            <p className="text-gray-700 mb-4">
              At [Your Brand Name], we're more than just a company – we're a community dedicated to enhancing your lifestyle. 
              Our commitment goes beyond providing exceptional products; we strive to create experiences that inspire and delight.
            </p>
            <p className="text-gray-700 mb-4">
              From our sustainable practices to our innovative designs, every aspect of our business is crafted with you in mind. 
              We believe in the power of quality, the importance of ethical practices, and the joy that comes from products made with passion.
            </p>
            <p className="text-gray-700">
              Thank you for being a part of our journey. Together, we're not just creating products; we're shaping a better, more beautiful world.
            </p>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUsSection;