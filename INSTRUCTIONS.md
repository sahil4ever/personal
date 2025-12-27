# Treasure Experience - Customization Instructions

## 1. Replacing Audio
- Place your audio files in `public/audio/`.
- Ensure you have a file named `sweet_song.mp3` for the final surprise, or update the filename in `RevealScreen.jsx`.

## 2. Adding Photos (The Easy Way!)
I have set up a special folder for your pictures.

1.  Go to `src/components/memories` folder. (Create it if it's missing, but it should be there).
2.  **Paste all your photos** inside this folder.
3.  That's it! 

The project fits automatically convert any `.jpg`, `.png`, or `.jpeg` file in that folder into a Polaroid memory in the galaxy cloud. You don't need to touch any code!

## 3. General
- Run `npm run dev` to start the local server.

---

# How to Share (Without Paying for Hosting)

Since this is a web app, you have two great free options to share it with your special someone.

### Option A: Temporary Link (Runs from your PC)
Use a tool called **ngrok** to create a public link to your computer.
*Pros: No upload needed. Cons: Link stops working when you close your laptop.*

1.  Download **ngrok** (free) from [ngrok.com](https://ngrok.com/download).
2.  Unzip it.
3.  Open your terminal where your app is running (`npm run dev`). Note the port number (usually `5173`).
4.  Open a second terminal window.
5.  Run: `ngrok http 5173` (or whatever your port is).
6.  Ngrok will give you a public URL (like `https://random-name.ngrok-free.app`).
7.  Send that link! It works as long as `npm run dev` is running.

### Option B: Vercel (Permanent & Free) - Recommended!
Vercel is a free service for React apps. It takes 2 minutes.
*Pros: Permanent link, works 24/7.*

1.  Go to [vercel.com](https://vercel.com) and Sign Up (it's free).
2.  Install the Vercel CLI:
    ```bash
    npm install -g vercel
    ```
3.  In your project folder (`treasure-experience`), run:
    ```bash
    vercel
    ```
4.  Hit **Enter** for all the default questions (Y, Y, N, etc.).
5.  It will upload your site and give you a permanent link (e.g., `https://treasure-experience.vercel.app`).
6.  Send that link! It will work forever.
