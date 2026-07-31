# 💗 Girlfriend Day — A Little Surprise

A tiny, playful and romantic two-page website made specially for **Girlfriend Day**.

The idea is simple:

> First, she gets asked a very important question.
> Then the **"No"** button mysteriously refuses to cooperate. 😏
> And if she chooses **"Yes"**, a little surprise awaits. ❤️

---

## ✨ Features

### 💕 Page 1 — "Do YOU Love me?"

A soft pink, minimalist interface featuring:

* A light pink background
* A white question box
* **"Do YOU Love me"** in bold black text
* A red **Yes** button
* A green **No** button
* A tiny animated boy and girl running between the two boxes

### 😈 The Evasive "No" Button

The **No** button doesn't make things that easy.

When she tries to click/tap it, the button playfully moves away.

If she somehow manages to press **No**, the page resets and the game starts again.

The **Yes** button, however, remains right where it should be. 😉

---

## 🌌 Page 2 — The Surprise

Clicking **Yes** opens a completely different scene.

The second page features:

* A black, dreamy, space-like background
* Subtle stars and glowing particles
* Falling **Frangipani flowers**
* Silver **"I knew it"** text
* A gentle pulse animation
* After approximately 5 seconds:

### `আমি তোমাকে ভালোবাসি`

A Bengali "I Love You" message appears with a soft romantic reveal.

---

## 📱 Shake the Phone

The second page can react to the phone's motion.

When the phone is shaken:

* More Frangipani flowers appear
* Flowers fall faster
* The scene becomes more energetic

When the phone stops shaking, the animation gradually returns to normal.

If the browser/device doesn't support motion sensors or permission is denied, the website continues working normally with the standard flower animation.

---

## 🛠️ Technology

The project is designed to remain lightweight and easy to deploy.

Depending on the implementation, it uses:

* HTML
* CSS
* JavaScript
* CSS/SVG/Canvas animations
* Browser Device Motion APIs
* Responsive/mobile-first design

No backend or database is required.

---

## 📂 Project Structure

A simple version of the project may look like:

```text
girlfriend-day/
│
├── index.html
├── page2.html
├── style.css
├── script.js
│
├── assets/
│   ├── flowers/
│   └── characters/
│
└── README.md
```

> The exact structure may differ depending on the implementation.

---

# 🚀 Run Locally

## Option 1 — Open Directly

For a simple HTML/CSS/JavaScript version, you can open:

```text
index.html
```

directly in your browser.

However, some browser features—especially device motion—may work differently when opened from a local file.

For the best test, use a local development server.

---

## Option 2 — Run a Local Server

If you have Python installed:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

on your browser.

---

# 🐙 Deploy to GitHub Pages

The website is intended to be hosted using **GitHub Pages**.

## 1. Create a GitHub Repository

Go to GitHub and create a new repository.

Suggested repository name:

```text
girlfriend-day
```

A simple repository name is recommended.

---

## 2. Upload the Project

Make sure your project contains the required website files, especially:

```text
index.html
```

along with your CSS, JavaScript and assets.

You can upload them directly through GitHub's website or push them using Git.

---

## 3. Using Git

From the project folder:

```bash
git init
```

Add the files:

```bash
git add .
```

Create the first commit:

```bash
git commit -m "Create Girlfriend Day website"
```

Connect your GitHub repository:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
```

Then push:

```bash
git branch -M main
git push -u origin main
```

Replace:

```text
YOUR_GITHUB_REPOSITORY_URL
```

with the URL of your own GitHub repository.

---

# 🌐 Enable GitHub Pages

Once the project is pushed to GitHub:

1. Open your repository.
2. Click **Settings**.
3. Find **Pages** in the sidebar.
4. Under **Build and deployment**, select the appropriate source.
5. Choose the `main` branch.
6. Select the `/ (root)` folder if the website is a simple static project.
7. Click **Save**.

GitHub will then build and publish the website.

It may take a short while before the website becomes available.

---

# 🔗 Your Shareable Link

Once GitHub Pages finishes deploying, GitHub will provide a public HTTPS URL.

It will generally look similar to:

```text
https://YOUR-USERNAME.github.io/girlfriend-day/
```

Your actual URL will depend on your GitHub username and repository name.

Open the URL and test the website.

---

# 📱 Test It On Your Phone

Before sharing it with her, test the website yourself.

### Page 1

* [ ] Pink background appears correctly
* [ ] Question is centered
* [ ] Yes button works
* [ ] No button moves away
* [ ] No button stays inside the screen
* [ ] No unwanted horizontal scrolling
* [ ] Boy/girl animation works

### Page 2

* [ ] Black space background loads
* [ ] Stars/particles appear
* [ ] Frangipani flowers fall
* [ ] "I knew it" appears
* [ ] Pulse animation works
* [ ] Bengali message appears after ~5 seconds
* [ ] Bengali characters render correctly

### Motion

* [ ] Phone shake detection works
* [ ] Shaking increases flower activity
* [ ] Animation returns to normal afterward
* [ ] Website still works if motion permission is denied

---

# 💌 Send It To Her

Once you've tested everything:

**Copy your GitHub Pages URL → Send it to her → She opens it on her phone.**

No app installation is required.

Your computer **does not need to be turned on**.

GitHub hosts the website for you.

---

## ❤️ The Intended Experience

The whole experience is meant to be very simple:

```text
                 💗
          Do YOU Love me?

                 🏃‍♂️ 🏃‍♀️

          ┌───────────────┐
          │    Yes   No   │
          └───────────────┘
                    ↓
               She clicks
                  YES
                    ↓
             ✨ Surprise ✨
                    ↓
          🌌 Black Space 🌌
                    ↓
          🌸 🌸 🌸 🌸 🌸
                    ↓
              I knew it
                    ↓
          🌸 🌸 🌸 🌸 🌸
                    ↓
       আমি তোমাকে ভালোবাসি
                    ↓
                ❤️
```

---

## 🎀 Made For One Person

This isn't meant to be a big website.

It's just a tiny digital surprise made to make **one particular person smile.**

**Happy Girlfriend Day ❤️**
