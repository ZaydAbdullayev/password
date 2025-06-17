export const roomSlots = [
    {
        id: 1,
        status: "OPPONENT WAITING",
        players: [
            {
                name: "Takashi",
                avatar: "https://static.vecteezy.com/system/resources/previews/011/483/813/non_2x/guy-anime-avatar-free-vector.jpg",
            },
            {
                name: "Luna",
                avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
            },
        ],
        color: "pink-orange",
    },
    {
        id: 2,
        status: "IN PROGRESS",
        players: [
            {
                name: "Aiko",
                avatar: "https://static.vecteezy.com/system/resources/previews/011/483/377/non_2x/anime-girl-avatar-free-vector.jpg",
            },
            {
                name: "Sakura",
                avatar: "https://static.vecteezy.com/system/resources/previews/011/485/187/non_2x/anime-girl-avatar-free-vector.jpg",
            },
        ],
        color: "blue-purple",
    },
    {
        id: 3,
        status: "IN PROGRESS",
        players: [
            {
                name: "Hiro",
                avatar: "https://static.vecteezy.com/system/resources/thumbnails/011/484/063/small_2x/boy-anime-avatar-free-vector.jpg",
            },
            {
                name: "Miyuki",
                avatar: "https://static.vecteezy.com/system/resources/previews/011/485/187/non_2x/anime-girl-avatar-free-vector.jpg",
            },
        ],
        color: "green-lime",
    },
    {
        id: 4,
        status: "WATCHING",
        players: [
            {
                name: "Shun",
                avatar: "https://static.vecteezy.com/ti/vettori-gratis/p1/11483944-anime-ragazzo-ritratto-gratuito-vettoriale.jpg",
            },
            {
                name: "Yumi",
                avatar: "https://static.vecteezy.com/system/resources/previews/011/483/377/non_2x/anime-girl-avatar-free-vector.jpg",
            },
        ],
        color: "orange-yellow",
    },
    {
        id: 5,
        status: "OPPONENT WAITING",
        players: [
            {
                name: "Amara",
                avatar: "https://img.freepik.com/premium-photo/subtle-elegance-minimalistic-animestyle-user-avatar-black-female-simple-color-patterns-ve_983420-37443.jpg",
            },
            {
                name: "Liam",
                avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
            },
        ],
        color: "purple-blue",
    },
    {
        id: 6,
        status: "IN PROGRESS",
        players: [
            {
                name: "Kenta",
                avatar: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/234080722/original/c99ca05f1d79fda61836b70e991fae719025cc85/create-anime-style-avatar-or-profile-picture.png",
            },
            {
                name: "Haruka",
                avatar: "https://static.vecteezy.com/system/resources/previews/011/483/813/non_2x/guy-anime-avatar-free-vector.jpg",
            },
        ],
        color: "yellow-pink",
    },
    {
        id: 7,
        status: "IN PROGRESS",
        players: [
            {
                name: "Renji",
                avatar: "https://static.vecteezy.com/ti/vettori-gratis/p1/11483944-anime-ragazzo-ritratto-gratuito-vettoriale.jpg",
            },
            {
                name: "Natsu",
                avatar: "https://static.vecteezy.com/system/resources/thumbnails/011/484/893/small_2x/teen-boy-anime-free-vector.jpg",
            },
        ],
        color: "pink-red",
    },
];

export const fullStartingBoard = [
    { type: "rook", side: "black" },
    { type: "knight", side: "black" },
    { type: "bishop", side: "black" },
    { type: "queen", side: "black" },
    { type: "king", side: "black" },
    { type: "bishop", side: "black" },
    { type: "knight", side: "black" },
    { type: "rook", side: "black" },
    ...Array(8).fill({ type: "pawn", side: "black" }),
    ...Array(32).fill(null),
    ...Array(8).fill({ type: "pawn", side: "white" }),
    { type: "rook", side: "white" },
    { type: "knight", side: "white" },
    { type: "bishop", side: "white" },
    { type: "queen", side: "white" },
    { type: "king", side: "white" },
    { type: "bishop", side: "white" },
    { type: "knight", side: "white" },
    { type: "rook", side: "white" },
  ];
  
export const imgs = [
    "https://oficialbac.com.br/cdn/shop/products/BAC21_2.jpg?v=1681937165",
    "https://cea.vtexassets.com/arquivos/ids/58410395/top-cropped-halter-neck-de-poliamida-off-white-1028226-Off_White_1.jpg?v=638405751972130000",
    "https://img.pica-cdn.com/image/aigc/f69a05f8e2724173565daa1d0625c167.webp",
    "https://img.pica-cdn.com/image/aigc/098abf58e0740707b6895d18719164a0.webp",
    "https://img.pica-cdn.com/image/aigc/dd9c961862dba5af874c3e6bd6b31a65.webp",
    "https://img.pica-cdn.com/image/aigc/b5b034233845dae902572567b3100143.webp",
    "https://img.pica-cdn.com/image/aigc/630d240da80bcb63b4b5750ebd3baba6.webp",
    "https://img.pica-cdn.com/image/aigc/489af1be76714a2f2a55e50c29dc71a1.webp",
    "https://img.pica-cdn.com/image/aigc/b50e0aa8b73266fc2216a01b5ac684ee.webp",
    "https://img.pica-cdn.com/image/aigc/9e3d67a06d941a2b6713a4c38e206904.webp",
    "https://img.pica-cdn.com/image/aigc/3861a3758b53329f1f51161e19c5d503.webp",
    "https://img.pica-cdn.com/image/aigc/2b52aa71d77e477588b2456eb9429254.webp",
    "https://img.pica-cdn.com/image/aigc/e3a4127804880f4f94448ec6dbe79003.webp",
];
  