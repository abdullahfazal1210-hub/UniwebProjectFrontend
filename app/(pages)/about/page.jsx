import React from "react";

function About() {
  const card = [
    {
      icon: "X",
      key: 1,
      heading: "Trust",
      desc: "Trust is the cornerstone of every successful real estate transaction.",
    },

    {
      icon: "X",
      key: 2,
      heading: "Excellence",
      desc: "We set the bar high for ourselves. From the properties we list to the services we provide.",
    },

    {
      icon: "X",
      key: 3,
      heading: "Client-Centric",
      desc: "Your dreams and needs are at the center of our universe. We listen, understand.",
    },

    {
      icon: "X",
      key: 4,
      heading: "Our Commitment",
      desc: "We are dedicated to providing you with the highest level of service, professionalism, and support.",
    },
  ];
  const achiveCard = [
    {
      step: "Step 01",
      title: "Discover a World of Possibilities",
      desc: "Your journey begins with exploring our carefully curated property listings. Use our intuitive search tools to filter properties based on your preferences, including location.",
    },
    {
      step: "Step 02",
      title: "Narrowing Down Your Choices",
      desc: "Once you've found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision.",
    },
    {
      step: "Step 03",
      title: "Personalized Guidance",
      desc: "Have questions about a property or need more information? Our dedicated team of real estate experts is just a call or message away.",
    },
    {
      step: "Step 04",
      title: "See It for Yourself",
      desc: "Arrange viewings of the properties you're interested in. We'll coordinate with the property owners and accompany you to ensure you get a firsthand look at your potential new home.",
    },
    {
      step: "Step 05",
      title: "Making Informed Decisions",
      desc: "Before making an offer, our team will assist you with due diligence, including property inspections, legal checks, and market analysis. We want you to be fully informed.",
    },
    {
      step: "Step 06",
      title: "Getting the Best Deal",
      desc: "We'll help you negotiate the best terms and prepare your offer. Our goal is to secure the property at the right price and on favorable terms.",
    },
  ];

  return (
    <div className="bg-[#141414]">
      <div className="main-container  ">
        <div className="sec-one flex ">
          <div className="left w-[50%] border h-[80vh] p-6 flex justify-center items-center ">
            <div className="w-[90%]  h-[60%] ">
              <h1 className="text-3xl  font-bold  tracking- text-white">
                Our Journey
              </h1>
              <p className="mt-6 text-[#939393]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam,
                doloremque at eum dignissimos voluptates ratione esse. Quidem
                sit dignissimos sunt corporis quia dolorum? Est quibusdam fugit,
                eos ex perspiciatis iusto?
              </p>
              <div className="little-cards mt-9 flex gap-2.5 ">
                <div className="card-one p-6 py-7 border bg-[#1A1A1A] rounded-[10px] ">
                  <h1 className="text-2xl text-white  font-bold ">2000+</h1>{" "}
                  <p className="text-[#939393]">Happy Customers</p>
                </div>
                <div className="card-two p-6 py-7 border bg-[#1A1A1A] rounded-[10px] ">
                  <h1 className="text-2xl  text-white font-bold">10k+</h1>{" "}
                  <p className="text-[#939393]">Properties For Clients</p>
                </div>
                <div className="card-three p-6 py-7 border bg-[#1A1A1A] rounded-[10px] ">
                  <h1 className="text-2xl text-white  font-bold">16+</h1>{" "}
                  <p className="text-[#939393]">Year of Experience</p>
                </div>
              </div>
            </div>
          </div>
          <div className="right w-full md:w-[50%] md:flex md:items-center">
            <div className="main w-full pos md:w-[80%] border rounded-[10px] border-[#939393]">
              <img
                className="w-full h-full rounded-[10px]"
                src="/img/sec-one.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="sec-two w-[100%] h-[75vh] gap-16 flex items-center  ">
          <div className="left w-[35%]   flex justify-center items-center">
            <div className=" w-[80%]">
              <h1 className="text-4xl p-5 bold text-white">Our Values</h1>
              <p className="text-[#828282]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt rem aut aperiam, dolorem iste dolore modi sed doloribus
                veniam eveniet doloremque at, rerum corrupti ut neque animi
                voluptatem itaque! Id?
              </p>
            </div>
          </div>

          <div className="text-[#828282] grid grid-cols-2 gap-3 w-[50%] p-6 rounded-xl border border-gray-700 bg-[#111] shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_0_15px_rgba(255,255,255,0.1)]">
            {card.map((des, index) => (
              <div
                key={index}
                className={`card p-10 h-40 ${
                  des.key === 2 || des.key === 4
                    ? "border-l-1 border-gray-700"
                    : "" >= des.key === 2 || des.key === 2
                    ? "border-b-1  border-gray-700"
                    : ""
                }`}
              >
                <div className="upper-sec flex gap-3">
                  <div className="icon border w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    {des.icon}
                  </div>
                  <div className="Heading flex items-center justify-center">
                    {des.heading}
                  </div>
                </div>
                <div className="description mt-4 text-sm">{des.desc}</div>
                <div
                  className={`${
                    des.key === 1
                      ? " border-b-1  border-gray-700  w-100"
                      : "hidden"
                  }  w-[230%] mt-5`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="sec-three  text-amber-50  h-[70vh]">
          <h1 className="text-4xl ms-18">Our Achievements</h1>
          <p className="text-[#828282] ms-18">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            laborum delectus nam.
          </p>

          <div className="achiv-card flex  w-full justify-evenly  ">
            <div className="card  p-8  w-[30%] ">
              <div className=" p-10  text-[#fcfafa] rounded-xl border border-gray-700 bg-[#111] shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_0_15px_rgba(255,255,255,0.1)]  w-[100%]">
                <h1 className="text-2xl font-bold">Year Experience</h1>
                <p className="text-[#828282] mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  a perspiciatis ipsam commodi officiis similique inventore.
                </p>
              </div>
            </div>
            <div className="card  p-8  w-[30%] ">
              <div className=" p-10 text-[#fcfafa] rounded-xl border border-gray-700 bg-[#111] shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_0_15px_rgba(255,255,255,0.1)]  w-[100%]">
                <h1 className="text-2xl font-bold">Year Experience</h1>
                <p className="text-[#828282] mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  a perspiciatis ipsam commodi officiis similique inventore.
                </p>
              </div>
            </div>
            <div className="card  p-8  w-[30%] ">
              <div className=" p-10  text-[#fcfafa] rounded-xl border border-gray-700 bg-[#111] shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_0_15px_rgba(255,255,255,0.1)]  w-[100%]">
                <h1 className="text-2xl font-bold">Year Experience</h1>
                <p className="text-[#828282] mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  a perspiciatis ipsam commodi officiis similique inventore.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sec-four text-amber-50 w-full min-h-screen">
          <h1 className="text-4xl ms-12">Our Achievements</h1>
          <p className="ms-12 text-[#828282]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            laborum delectus nam.
          </p>

          <div className="achiv-card mt-5 grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 md:px-12">
            {achiveCard.map((card,index) => (
              <div key={index} className="card w-full rounded-xl p-[1px] bg-gradient-to-b from-[#6B46C1] via-purple-500 to-transparent">
                <div className="bg-[#111] rounded-xl h-full w-full">
                  <div className="relative px-6 py-3 text-white text-sm font-medium border-b border-gray-700">
                     {card.step}
                    <div className="absolute top-0 right-0 h-full   rounded" />
                  </div>

                  <div className="relative p-6">
                    <div className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none" />
                    <h1 className="text-xl font-semibold text-white">
                     {card.title}
                    </h1>
                    <p className="text-[#9ca3af] mt-3 text-sm leading-relaxed">
                     {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

<div className="sec-five  text-amber-50 w-full min-h-screen">
    <div className="ms-12">
        <h1 className="text-4xl font-bold">Meet the Estain Team</h1>
        <p className="text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim quas voluptates error laudantium iusto harum sed similique .</p>
    </div>

<div className="TeamCards w-[100%] border ">
   <div className="card w-full  md:w-[20%] bg-[#111] rounded-xl border border-[#2c2c2c] p-6 flex flex-col items-center relative text-white">

  <div className="img w-full flex justify-center">
    <img
      src="/img/founder.jpg"
      alt="Founder"
      className="rounded-xl  w-full object-cover"
    />
  </div>


  <div className="absolute -bottom-6 flex justify-center w-full">
    <div className="bg-[#7c3aed] w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg">
      <i className="fab fa-twitter"></i> 
    </div>
  </div>


  <div className="mt-10 text-center">
    <h1 className="text-lg font-semibold">Max Mitchell</h1>
    <p className="text-sm text-gray-400 mt-1">Founder</p>
  </div>


  <div className="w-full mt-6">
    <div className="flex items-center justify-between bg-[#1c1c1c] rounded-full px-4 py-2">
      <input
        type="text"
        placeholder="Say Hello 👋"
        className="bg-transparent outline-none text-white placeholder:text-gray-400 w-full"
      />
      <div className="bg-[#7c3aed] w-8 h-8 rounded-full flex items-center justify-center text-white ml-3">
        <i className="fas fa-paper-plane text-sm"></i> 
      </div>
    </div>
  </div>
</div>

</div>



</div>

      </div>
    </div>
  );
}

export default About;
