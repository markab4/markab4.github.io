
let text = document.getElementById("mood-statement"),
    video = document.getElementById("video"),
    ring = document.getElementById("ring"),
    gif = document.getElementById("gif")
;

rings = [
    ["indianred", "You want to argue. You are mad. BIG MAD 😡", "https://www.youtube.com/embed/qdyjxupbcdE?autoplay=1"],
    ["hotpink", "You are IN LOVE 🥰 ... Your heart's been aching but you're too shy to say it. Inside, we both know what's going on. You know the game and you're gonna play it.", "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1", "https://media.giphy.com/media/GDwGfwoIC9Mru/giphy.gif"], //rick
    ["lawngreen", "You are HAPPY 😄 ... You feel like a room without a roof and like happiness is the truth. You know what happiness is to you and that's what you wanna do.", "https://www.youtube.com/embed/ZbZSe6N_BXs?start=5&autoplay=1", "https://media3.giphy.com/media/5GoVLqeAOo6PK/giphy.gif?cid=3640f6095c69fbc9586b51522e735afb"], // happy
    ["cornflowerblue", "You are SAD 😢 ... Darkness is your old friend, and he's come to talk with you again.", "https://www.youtube.com/embed/4zLfCnGVeL4?autoplay=1", "https://media1.giphy.com/media/yoJC2Olx0ekMy2nX7W/giphy.gif?cid=3640f6095c69fbe67349457441f6f42e"], //hello darkness
    ["indigo", "You are feeling BORED 😒... You know that only time can say where the road goes and where the day flows. And honestly you don't care. ", "https://www.youtube.com/embed/7wfYIMyS_dI?start=8&autoplay=1", "https://media3.giphy.com/media/o5oLImoQgGsKY/giphy.gif?cid=3640f6095c69fc02716965494dabf985"], //only time
    ["yellow", "You are feeling FEAR 😱... There are many people in the world capable of doing terrible things. Not to mention, there is lightning striking all over the world.", "https://www.youtube.com/embed/mw2kKyJu9gY?start=126&autoplay=1", "https://media2.giphy.com/media/14ut8PhnIwzros/giphy.gif?cid=3640f6095c69fcb669592f3041195ce1"], // run
    ["darkslategray", "You may be HEARTBROKEN 💔 now, but worry not -- your heart will go on.", "https://www.youtube.com/embed/DNyKDI9pn0Q?autoplay=1", "https://media2.giphy.com/media/pynZagVcYxVUk/giphy.gif?cid=3640f6095c69fc2a707852336320dbb3"] // titanic
];
function changeMood() {
    let mood = rings[Math.floor(Math.random() * 7)];
    text.innerText = mood[1];
    document.body.style.backgroundColor = mood[0];
    if (mood[0] !== "indianred"){
        video.style.display = "none";
        gif.src = mood[3];
        gif.style.display = "block";
    } else {
        video.style.display = "";
        gif.style.display = "none";
    }
    video.src = mood[2];
    ring.style.textShadow = "none";
    ring.style.color = mood[0];
    ring.style.filter = "brightness(50%)";
}