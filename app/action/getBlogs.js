

export default function getBlogs() {
    try {
      const data = [
        {
          id: 1,
          title: "How can I contact an Estatein agent?",
          desc: "Discover the different ways you can get in touch with our experienced agents.",
        },
        {
          id: 2,
          title: "How can I contact an Estatein agent?",
          desc: "Discover the different ways you can get in touch with our experienced agents.",
        },
        {
          id: 3,
          title: "How can I contact an Estatein agent?",
          desc: "Discover the different ways you can get in touch with our experienced agents.",
        },
        {
          id: 4,
          title: "How can I contact an Estatein agent?",
          desc: "Discover the different ways you can get in touch with our experienced agents.",
        },
      ];
      return data;
    } catch (error) {
      return error;
    }
  }