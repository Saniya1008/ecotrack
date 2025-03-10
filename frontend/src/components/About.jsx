import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="p-5 bg-gray-800 bg-opacity-50">
        <h1 className="text-4xl font-bold text-center">About Us</h1>
      </header>

      <main>
        {/* Background image with title */}
        <section
          className="relative w-full h-[600px] bg-cover bg-center text-center flex flex-col justify-center items-center"
          style={{
            backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31jlUXKyvvH98X5C9wdJGhJxsURi1AwKxEw&s)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="bg-black bg-opacity-40 p-8 rounded-md max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Empowering Indian Coal Mines on the Path to Carbon Neutrality
            </h2>
            <p className="text-lg md:text-xl">
              India's coal industry plays a pivotal role in powering the
              nation's economy, yet it faces a significant challenge: balancing
              energy demands with environmental responsibility. Our mission is
              to bridge this gap by providing a comprehensive tool that empowers
              coal mines to accurately quantify their carbon footprint and
              explore actionable pathways to carbon neutrality.
            </p>
          </div>
        </section>

        {/* What we do section */}
        <section className="p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">What we do</h3>
          <p className="text-lg mb-8">
            Precisely estimate emissions from various mining activities such as
            excavation, transportation, and equipment usage.
          </p>
        </section>

        {/* Features section */}
        <section className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <img
                src="https://scx2.b-cdn.net/gfx/news/2023/carbon-emissions-cost.jpg"
                alt="Quantify Carbon Emissions"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">
                Quantify Carbon Emissions
              </h4>
              <p className="text-lg">
                Precisely estimate emissions from various mining activities such
                as excavation, transportation, and equipment usage.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMY6K3D2PSxkdacHlUFQMEGgQ0NSY5e0E0t1ta6np0W_yQrW0toi8dRxU2Zw5Wn70iOPM&usqp=CAU"
                alt="Evaluate Carbon Sinks"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">
                Evaluate Carbon Sinks
              </h4>
              <p className="text-lg">
                Analyze existing carbon sinks and identify gaps that need
                addressing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <img
                src="https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/7363971/wind-solar.jpg?quality=90&strip=all&crop=0%2C3.7777777777778%2C100%2C92.444444444444&w=2400"
                alt="Explore Carbon Neutrality Pathways"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">
                Explore Carbon Neutrality Pathways
              </h4>
              <p className="text-lg">
                Simulate and assess the impact of adopting clean technologies
                and renewable energy strategies.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <img
                src="https://media.licdn.com/dms/image/D5612AQFfLQGdn8xbpw/article-cover_image-shrink_720_1280/0/1694575490470?e=2147483647&v=beta&t=0Y9IAdIeuaR8Z_TIUxKBofsDMVX3Mdxs9q9VnKLWNgY"
                alt="Visualize Data"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">Visualize Data</h4>
              <p className="text-lg">
                Use interactive charts and graphs to track emissions and make
                data-driven decisions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <img
                src="https://eos.com/wp-content/uploads/2024/02/carbon-credits-main.png.webp"
                alt="Estimate Carbon Credits"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">
                Estimate Carbon Credits
              </h4>
              <p className="text-lg">
                Calculate potential carbon credits based on current market rates
                to monetize sustainability efforts.
              </p>
            </div>
          </div>
        </section>

        {/* Vision as footer */}
        <footer className="bg-gray-800 p-8 text-center">
          <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
          <p className="text-lg">
            We believe in a sustainable future by helping coal mine operators
            meet regulatory requirements and contribute meaningfully to climate
            goals.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default About;
