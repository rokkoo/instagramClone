export default {
    images: {
        heartIcon: require("../../assets/heart.png"),
        topicIcon: require("../../assets/topic.png"),
        backIcon: require("../../assets/back.png"),
        login: "http://res.cloudinary.com/rokkoo/image/upload/v1528759482/julian-paul-378483-unsplash.jpg"
    },
    styleConstants: {
        rowHeight: 50
    },
    Api: {
        url: 'http://instagram-clone-api-kicclp.turbo360-vertex.com/api/',
        firebaseConfig: {
            apiKey: "AIzaSyD117GVcugUQfejuXF637qrSQQZ5NlHl5Y",
            authDomain: "instagram-clon-d460f.firebaseapp.com",
            databaseURL: "https://instagram-clon-d460f.firebaseio.com",
            projectId: "instagram-clon-d460f",
            storageBucket: "instagram-clon-d460f.appspot.com",
            messagingSenderId: "850013781336"
        },
        cloudinary: {
            key: "839181651442274",
            secret: "dqFAGoJ0HryVMl_ujYFtVrn-c2k",
            name: "rokkoo",
            preset: "wqgi9m18"
        }
    }
}