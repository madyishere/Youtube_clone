const mockData = [
  {
    videoId: "vid001",
    title: "Learn React in 2024 - Full Course for Beginners",
    videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
    thumbnailUrl: "https://i3.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    channelAvatarUrl: "https://i3.ytimg.com/vi/bMknfKXIFA8/default.jpg",
    description: "Complete React tutorial covering hooks, components, and modern best practices",
    channelId: "ch001",
    channel: "TechEd Pro",
    category: "Tech",
    views: 1543789,
    likes: 145023,
    dislikes: 1245,
    uploadDate: "2024-01-15",
    duration: "2:15:30",
    tags: ["react", "javascript", "programming"],
    comments: [
      { commentId: "comment001", userId: "user01", text: "This React course is exactly what I needed! The explanations are crystal clear.", timestamp: "2024-02-01" },
      { commentId: "comment002", userId: "user02", text: "The section on hooks really helped me understand useEffect better.", timestamp: "2024-02-02" }
    ]
  },
  {
    videoId: "vid002",
    title: "Making a Minecraft Clone in JavaScript",
    videoUrl: "https://www.youtube.com/watch?v=qpOZup_3P_A",
    thumbnailUrl: "https://i3.ytimg.com/vi/qpOZup_3P_A/maxresdefault.jpg",
    channelAvatarUrl: "https://i3.ytimg.com/vi/qpOZup_3P_A/default.jpg",
    description: "Build your own Minecraft-style game using Three.js and JavaScript",
    channelId: "ch002",
    channel: "GameDev Masters",
    category: "Gaming",
    views: 892345,
    likes: 78234,
    dislikes: 890,
    uploadDate: "2024-01-28",
    duration: "1:45:20",
    tags: ["javascript", "gamedev", "threejs"],
    comments: [
      { commentId: "comment003", userId: "user03", text: "Mind-blowing how you can create Minecraft in JavaScript! 🤯", timestamp: "2024-02-03" },
      { commentId: "comment004", userId: "user04", text: "Can't wait to try this out. Three.js is amazing!", timestamp: "2024-02-04" }
    ]
  },
  {
    videoId: "vid003",
    title: "5 CSS Tricks You Didn't Know About",
    videoUrl: "https://www.youtube.com/watch?v=1PnVor36_40",
    thumbnailUrl: "https://i3.ytimg.com/vi/1PnVor36_40/maxresdefault.jpg",
    channelAvatarUrl: "https://i3.ytimg.com/vi/1PnVor36_40/default.jpg",
    description: "Advanced CSS techniques for modern web development",
    channelId: "ch003",
    channel: "WebDev Simplified",
    category: "Tech",
    views: 456123,
    likes: 34567,
    dislikes: 234,
    uploadDate: "2024-02-01",
    duration: "12:45",
    tags: ["css", "webdev", "frontend"],
    comments: [
      { commentId: "comment005", userId: "user05", text: "CSS trick #3 blew my mind! Never knew this was possible.", timestamp: "2024-02-05" },
      { commentId: "comment006", userId: "user06", text: "These tricks saved me hours of work! Thank you!", timestamp: "2024-02-06" }
    ]
  },
  {
    videoId: "vid004",
    title: "Building a Twitter Clone with Next.js 14",
    videoUrl: "https://www.youtube.com/watch?v=PGPGcKBpAk8",
    thumbnailUrl: "https://i3.ytimg.com/vi/PGPGcKBpAk8/maxresdefault.jpg",
    channelAvatarUrl: "https://i3.ytimg.com/vi/PGPGcKBpAk8/default.jpg",
    description: "Full-stack application development with Next.js and Firebase",
    channelId: "ch004",
    channel: "NextLevel Coding",
    category: "Tech",
    views: 234567,
    likes: 23456,
    dislikes: 345,
    uploadDate: "2024-02-05",
    duration: "3:20:15",
    tags: ["nextjs", "react", "firebase"],
    comments: [
      { commentId: "comment007", userId: "user07", text: "Finally, a comprehensive Next.js tutorial! 🚀", timestamp: "2024-02-07" },
      { commentId: "comment008", userId: "user08", text: "The Firebase integration part was super helpful.", timestamp: "2024-02-08" }
    ]
  },
  {
    videoId: "vid005",
    title: "Data Structures Explained in 20 Minutes",
    videoUrl: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
    thumbnailUrl: "https://i3.ytimg.com/vi/RBSGKlAvoiM/maxresdefault.jpg",
    channelAvatarUrl: "https://i3.ytimg.com/vi/RBSGKlAvoiM/default.jpg",
    description: "Quick overview of essential computer science concepts",
    channelId: "ch005",
    channel: "CS Fundamentals",
    category: "Education",
    views: 789012,
    likes: 67890,
    dislikes: 567,
    uploadDate: "2024-02-10",
    duration: "20:30",
    tags: ["computerscience", "programming", "education"],
    comments: [
      { commentId: "comment009", userId: "user09", text: "Best explanation of data structures I've ever seen!", timestamp: "2024-02-09" },
      { commentId: "comment010", userId: "user10", text: "Could you make more videos like this? So helpful!", timestamp: "2024-02-10" }
    ]
  },
  {
    videoId: "vid006",
    title: "Epic Soccer Match Highlights - World Cup Finals",
    videoUrl: "https://example.com/soccer-match",
    thumbnailUrl: "https://example.com/soccer-thumbnail.jpg",
    channelAvatarUrl: "https://example.com/sports-channel-avatar.jpg",
    description: "Highlights from the thrilling World Cup final match",
    channelId: "ch006",
    channel: "Sports Central",
    category: "Sports",
    views: 345678,
    likes: 45678,
    dislikes: 234,
    uploadDate: "2024-02-15",
    duration: "15:30",
    tags: ["soccer", "worldcup", "sports"],
    comments: [
      { commentId: "comment011", userId: "user11", text: "What an incredible match! Edge of my seat the whole time!", timestamp: "2024-02-11" },
      { commentId: "comment012", userId: "user12", text: "That goal at 7:15 was unbelievable!", timestamp: "2024-02-12" }
    ]
  },
  {
    videoId: "vid007",
    title: "Stand-up Comedy Special 2024",
    videoUrl: "https://example.com/comedy-special",
    thumbnailUrl: "https://example.com/comedy-thumbnail.jpg",
    channelAvatarUrl: "https://example.com/comedy-avatar.jpg",
    description: "Hilarious stand-up comedy special from the world's top comedian",
    channelId: "ch007",
    channel: "Comedy Central",
    category: "Comedy",
    views: 567890,
    likes: 56789,
    dislikes: 456,
    uploadDate: "2024-02-20",
    duration: "45:30",
    tags: ["comedy", "standup", "entertainment"],
    comments: [
      { commentId: "comment013", userId: "user13", text: "Haven't laughed this hard in ages! 😂", timestamp: "2024-02-13" },
      { commentId: "comment014", userId: "user14", text: "The airplane joke had me rolling!", timestamp: "2024-02-14" }
    ]
  },
  {
    videoId: "vid008",
    title: "Latest News Update - Global Events Roundup",
    videoUrl: "https://example.com/news-update",
    thumbnailUrl: "https://example.com/news-thumbnail.jpg",
    channelAvatarUrl: "https://example.com/news-avatar.jpg",
    description: "Comprehensive coverage of today's top global news stories",
    channelId: "ch008",
    channel: "World News Network",
    category: "News",
    views: 234567,
    likes: 23456,
    dislikes: 789,
    uploadDate: "2024-02-25",
    duration: "10:15",
    tags: ["news", "current events", "global"],
    comments: [
      { commentId: "comment015", userId: "user15", text: "Great coverage of the international summit", timestamp: "2024-02-15" },
      { commentId: "comment016", userId: "user16", text: "Thanks for the balanced reporting!", timestamp: "2024-02-16" }
    ]
  },
  {
    videoId: "vid009",
    title: "Italian Pasta Masterclass",
    videoUrl: "https://example.com/cooking-pasta",
    thumbnailUrl: "https://example.com/cooking-thumbnail.jpg",
    channelAvatarUrl: "https://example.com/cooking-avatar.jpg",
    description: "Learn to make authentic Italian pasta from scratch",
    channelId: "ch009",
    channel: "Culinary Masters",
    category: "Cooking",
    views: 678901,
    likes: 67890,
    dislikes: 567,
    uploadDate: "2024-03-01",
    duration: "25:45",
    tags: ["cooking", "italian", "pasta"],
    comments: [
      { commentId: "comment017", userId: "user17", text: "Made this pasta last night - amazing results!", timestamp: "2024-02-17" },
      { commentId: "comment018", userId: "user18", text: "The sauce technique is game-changing", timestamp: "2024-02-18" }
    ]
  },
  {
    videoId: "vid010",
    title: "Top 10 Music Hits of 2024",
    videoUrl: "https://example.com/music-hits",
    thumbnailUrl: "https://example.com/music-thumbnail.jpg",
    channelAvatarUrl: "https://example.com/music-avatar.jpg",
    description: "Countdown of this year's biggest music hits",
    channelId: "ch010",
    channel: "Music Charts",
    category: "Music",
    views: 456789,
    likes: 45678,
    dislikes: 345,
    uploadDate: "2024-03-05",
    duration: "15:30",
    tags: ["music", "hits", "2024"],
    comments: [
      { commentId: "comment019", userId: "user19", text: "Song #3 is my absolute favorite!", timestamp: "2024-02-19" },
      { commentId: "comment020", userId: "user20", text: "Great selection of songs this year", timestamp: "2024-02-20" }
    ]
  },
  {
    videoId: "vid011",
    title: "Python for Data Science - 2024 Guide",
    videoUrl: "https://www.youtube.com/watch?v=LHBE6Q9XlzI",
    thumbnailUrl: "https://i3.ytimg.com/vi/LHBE6Q9XlzI/maxresdefault.jpg",
    channelAvatarUrl: "https://i3.ytimg.com/vi/LHBE6Q9XlzI/default.jpg",
    description: "Complete guide to Python for data science",
    channelId: "ch011",
    channel: "Data Science Pro",
    category: "Education",
    views: 789012,
    likes: 78901,
    dislikes: 678,
    uploadDate: "2024-03-10",
    duration: "3:45:30",
    tags: ["python", "datascience", "programming"],
    comments: [
      { commentId: "comment019", userId: "user19", text: "Perfect guide for data science beginners!", timestamp: "2024-02-19" },
      { commentId: "comment020", userId: "user20", text: "The pandas tutorial section was exactly what I needed.", timestamp: "2024-02-20" }
    ]
  },
  {
    videoId: "vid013",
    title: "Vue.js Crash Course 2024",
    videoUrl: "https://www.youtube.com/watch?v=qZXt1Aom3Cs",
    thumbnailUrl: "https://i3.ytimg.com/vi/qZXt1Aom3Cs/maxresdefault.jpg",
    channelAvatarUrl: "https://i3.ytimg.com/vi/qZXt1Aom3Cs/default.jpg",
    description: "Learn Vue.js fundamentals quickly",
    channelId: "ch013",
    channel: "Vue Master",
    category: "Tech",
    views: 234567,
    likes: 23456,
    dislikes: 123,
    uploadDate: "2024-03-20",
    duration: "1:30:20",
    tags: ["vuejs", "javascript", "frontend"],
    comments: [
      { commentId: "comment021", userId: "user21", text: "Vue.js explained so well! Love the examples.", timestamp: "2024-02-21" },
      { commentId: "comment022", userId: "user22", text: "The composition API section was eye-opening!", timestamp: "2024-02-22" }
    ]
  },
  {
    videoId: "vid014",
    title: "AWS Certified Cloud Practitioner Course",
    videoUrl: "https://www.youtube.com/watch?v=3hLmDS179YE",
    thumbnailUrl: "https://i3.ytimg.com/vi/3hLmDS179YE/maxresdefault.jpg",
    channelAvatarUrl: "https://i3.ytimg.com/vi/3hLmDS179YE/default.jpg",
    description: "Complete AWS certification preparation",
    channelId: "ch014",
    channel: "Cloud Guru",
    category: "Tech",
    views: 567890,
    likes: 56789,
    dislikes: 456,
    uploadDate: "2024-03-25",
    duration: "4:15:30",
    tags: ["aws", "cloud", "certification"],
    comments: [
      { commentId: "comment023", userId: "user23", text: "Passed my AWS certification thanks to this course! 🎉", timestamp: "2024-02-23" },
      { commentId: "comment024", userId: "user24", text: "The practice questions were really helpful.", timestamp: "2024-02-24" }
    ]
  },
  {
    channelId: "ch015",
      channel: "AI Academy",
      views: 678901,
      likes: 67890,
      dislikes: 567,
      category: "Tech",
      uploadDate: "2024-04-01",
      duration: "2:45:15",
      tags: ["machinelearning", "tensorflow", "ai"],
      comments: [
        { commentId: "comment025", userId: "user25", text: "TensorFlow makes so much more sense now!", timestamp: "2024-02-25" },
        { commentId: "comment026", userId: "user26", text: "Great explanation of neural networks!", timestamp: "2024-02-26" }
      ]
    },
    {
      videoId: "vid016",
      title: "Redux Toolkit Complete Guide",
      videoUrl: "https://www.youtube.com/watch?v=9zySeP5vH9c",
      thumbnailUrl: "https://i3.ytimg.com/vi/9zySeP5vH9c/maxresdefault.jpg",
      channelAvatarUrl: "https://i3.ytimg.com/vi/9zySeP5vH9c/default.jpg",
      description: "Master state management with Redux Toolkit",
      channelId: "ch016",
      channel: "Redux Pro",
      views: 345678,
      category: "Tech",
      likes: 34567,
      dislikes: 234,
      uploadDate: "2024-04-05",
      duration: "1:45:30",
      tags: ["redux", "react", "javascript"],
      comments: [
        { commentId: "comment027", userId: "user27", text: "Redux Toolkit simplified my state management so much!", timestamp: "2024-02-27" },
        { commentId: "comment028", userId: "user28", text: "The createSlice examples were perfect.", timestamp: "2024-02-28" }
      ]
    },
    {
      videoId: "vid017",
      title: "Angular vs React in 2024",
      videoUrl: "https://www.youtube.com/watch?v=u21W_tfPVrY",
      thumbnailUrl: "https://i3.ytimg.com/vi/u21W_tfPVrY/maxresdefault.jpg",
      channelAvatarUrl: "https://i3.ytimg.com/vi/u21W_tfPVrY/default.jpg",
      description: "Comparing popular frontend frameworks",
      channelId: "ch017",
      channel: "Framework Battle",
      views: 456789,
      likes: 45678,
      dislikes: 345,
      category: "Tech",
      uploadDate: "2024-04-10",
      duration: "25:15",
      tags: ["angular", "react", "frontend"],
      comments: [
        { commentId: "comment029", userId: "user29", text: "Great comparison! Really helped me choose between the frameworks.", timestamp: "2024-03-01" },
        { commentId: "comment030", userId: "user30", text: "Unbiased and detailed analysis. Thank you!", timestamp: "2024-03-02" }
      ]
    },
    {
      videoId: "vid018",
      title: "MongoDB Complete Tutorial",
      videoUrl: "https://www.youtube.com/watch?v=pWbMrx5rVBE",
      thumbnailUrl: "https://i3.ytimg.com/vi/pWbMrx5rVBE/maxresdefault.jpg",
      channelAvatarUrl: "https://i3.ytimg.com/vi/pWbMrx5rVBE/default.jpg",
      description: "Learn MongoDB from scratch",
      channelId: "ch018",
      channel: "Database Pro",
      views: 234567,
      likes: 23456,
      category: "Tech",
      dislikes: 123,
      uploadDate: "2024-04-15",
      duration: "2:30:45",
      tags: ["mongodb", "database", "backend"],
      comments: [
        { commentId: "comment031", userId: "user31", text: "MongoDB aggregation pipeline finally makes sense!", timestamp: "2024-03-03" },
        { commentId: "comment032", userId: "user32", text: "The indexing section was super helpful.", timestamp: "2024-03-04" }
      ]
    },
    {
      videoId: "vid019",
      title: "Kubernetes for Beginners",
      videoUrl: "https://www.youtube.com/watch?v=X48VuDVv0do",
      thumbnailUrl: "https://i3.ytimg.com/vi/X48VuDVv0do/maxresdefault.jpg",
      channelAvatarUrl: "https://i3.ytimg.com/vi/X48VuDVv0do/default.jpg",
      description: "Get started with Kubernetes",
      channelId: "ch019",
      channel: "DevOps Pro",
      views: 567890,
      category: "Tech",
      likes: 56789,
      dislikes: 456,
      uploadDate: "2024-04-20",
      duration: "3:15:20",
      tags: ["kubernetes", "devops", "docker"],
      comments: [
        { commentId: "comment033", userId: "user33", text: "K8s explained in a way that actually makes sense!", timestamp: "2024-03-05" },
        { commentId: "comment034", userId: "user34", text: "The pod networking section was enlightening.", timestamp: "2024-03-06" }
      ]
    },
    {
      videoId: "vid024",
      title: "Rust Programming Language Tutorial",
      videoUrl: "https://www.youtube.com/watch?v=5C_HPTJg5ek",
      thumbnailUrl: "https://i3.ytimg.com/vi/5C_HPTJg5ek/maxresdefault.jpg",
      channelAvatarUrl: "https://i3.ytimg.com/vi/5C_HPTJg5ek/default.jpg",
      description: "Learn Rust from scratch",
      channelId: "ch024",
      channel: "Systems Programming",
      views: 156789,
      likes: 12345,
      dislikes: 167,
      category: "Education",
      uploadDate: "2024-05-08",
      duration: "3:15:45",
      tags: ["rust", "programming", "systems"],
      comments: [
        { commentId: "comment035", userId: "user35", text: "Rust's ownership model finally clicks! Thank you!", timestamp: "2024-03-07" },
        { commentId: "comment036", userId: "user36", text: "Great coverage of memory safety concepts.", timestamp: "2024-03-08" }
      ]
    },
    {
      videoId: "vid025",
      title: "Web3 Development with Solidity",
      videoUrl: "https://www.youtube.com/watch?v=M576WGiDBdQ",
      thumbnailUrl: "https://i3.ytimg.com/vi/M576WGiDBdQ/maxresdefault.jpg",
      channelAvatarUrl: "https://i3.ytimg.com/vi/M576WGiDBdQ/default.jpg",
      description: "Build your first smart contract",
      channelId: "ch025",
      channel: "Blockchain Dev",
      views: 234567,
      likes: 21234,
      dislikes: 345,
      uploadDate: "2024-05-12",
      category: "Tech",
      duration: "2:10:30",
      tags: ["web3", "solidity", "blockchain"],
      comments: [
        { commentId: "comment037", userId: "user37", text: "Built my first smart contract following this! Amazing!", timestamp: "2024-03-09" },
        { commentId: "comment038", userId: "user38", text: "The gas optimization tips were gold!", timestamp: "2024-03-10" }
      ]
    },
    {
      videoId: "vid026",
      title: "CI/CD Pipeline with GitHub Actions",
      videoUrl: "https://www.youtube.com/watch?v=R8_veQiYBjI",
      thumbnailUrl: "https://i3.ytimg.com/vi/R8_veQiYBjI/maxresdefault.jpg",
      channelAvatarUrl: "https://i3.ytimg.com/vi/R8_veQiYBjI/default.jpg",
      description: "Automate your development workflow",
      channelId: "ch026",
      channel: "DevOps Journey",
      category: "Tech",
      views: 178934,
      likes: 14567,
      dislikes: 123,
      uploadDate: "2024-05-15",
      duration: "1:45:20",
      tags: ["devops", "github", "cicd"],
      comments: [
        { commentId: "comment039", userId: "user39", text: "Finally got my CI/CD pipeline working! Thanks!", timestamp: "2024-03-11" },
        { commentId: "comment040", userId: "user40", text: "The workflow optimization section was super helpful.", timestamp: "2024-03-12" }
      ]
    },
    {
      videoId: "vid027",
      title: "SwiftUI Masterclass - iOS Development",
      videoUrl: "https://www.youtube.com/watch?v=F2ojC6TNwws",
      thumbnailUrl: "https://i3.ytimg.com/vi/F2ojC6TNwws/maxresdefault.jpg",
      channelAvatarUrl: "https://i3.ytimg.com/vi/F2ojC6TNwws/default.jpg",
      description: "Build modern iOS apps with SwiftUI",
      channelId: "ch027",
      channel: "iOS Master",
      category: "Tech",
      views: 145678,
      likes: 12789,
      dislikes: 156,
      uploadDate: "2024-05-18",
      duration: "4:30:15",
      tags: ["ios", "swift", "swiftui"],
      comments: [
        { commentId: "comment041", userId: "user41", text: "SwiftUI animations are so much fun after this tutorial!", timestamp: "2024-03-13" },
        { commentId: "comment042", userId: "user42", text: "Great coverage of the new iOS 17 features!", timestamp: "2024-03-14" }
      ]
    },
    {
      videoId: "vid028",
      title: "Django REST Framework Complete Course",
      videoUrl: "https://www.youtube.com/watch?v=c708Nf0cHrs",
      thumbnailUrl: "https://i3.ytimg.com/vi/c708Nf0cHrs/maxresdefault.jpg",
      channelAvatarUrl: "https://i3.ytimg.com/vi/c708Nf0cHrs/default.jpg",
      description: "Build robust APIs with Django",
      channelId: "ch028",
      channel: "Python Backend",
      category: "Tech",
      views: 198765,
      likes: 16789,
      dislikes: 234,
      uploadDate: "2024-05-22",
      duration: "3:20:45",
      tags: ["django", "python", "api"],
      comments: [
        { commentId: "comment043", userId: "user43", text: "Django REST Framework concepts explained perfectly!", timestamp: "2024-03-15" },
        { commentId: "comment044", userId: "user44", text: "The authentication section was particularly helpful.", timestamp: "2024-03-16" }
      ]
    },
    {
      videoId: "vid029",
      title: "Advanced CSS Animations and Transitions",
      videoUrl: "https://www.youtube.com/watch?v=YszONjKpgg4",
      thumbnailUrl: "https://i3.ytimg.com/vi/YszONjKpgg4/maxresdefault.jpg",
      channelAvatarUrl: "https://i3.ytimg.com/vi/YszONjKpgg4/default.jpg",
      description: "Create stunning web animations",
      channelId: "ch029",
      channel: "CSS Ninja",
      category: "Tech",
      views: 167834,
      likes: 13456,
      dislikes: 145,
      uploadDate: "2024-05-25",
      duration: "1:50:30",
      tags: ["css", "animations", "webdev"],
      comments: [
        { commentId: "comment045", userId: "user45", text: "These CSS animations are mind-blowing! 🎨", timestamp: "2024-03-17" },
        { commentId: "comment046", userId: "user46", text: "The keyframe examples were super creative!", timestamp: "2024-03-18" }
      ]
    },
    {
      videoId: "vid030",
      title: "Electron.js Desktop App Development",
      videoUrl: "https://www.youtube.com/watch?v=ML743nrkMHw",
      thumbnailUrl: "https://i3.ytimg.com/vi/ML743nrkMHw/maxresdefault.jpg",
      channelAvatarUrl: "https://i3.ytimg.com/vi/ML743nrkMHw/default.jpg",
      description: "Build cross-platform desktop apps",
      channelId: "ch030",
      channel: "Desktop Dev Pro",
      views: 145678,
      likes: 11234,
      category: "Tech",
      dislikes: 167,
      uploadDate: "2024-05-28",
      duration: "2:45:15",
      tags: ["electron", "javascript", "desktop"],
      comments: [
        { commentId: "comment047", userId: "user47", text: "Built my first desktop app thanks to this tutorial!", timestamp: "2024-03-19" },
        { commentId: "comment048", userId: "user48", text: "The IPC handling section was very well explained.", timestamp: "2024-03-20" }
      ]
    }
];

export default mockData;