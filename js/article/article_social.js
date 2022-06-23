/* Social share links:

Facebook: https://www.facebook.com/sharer.php?u=[post-url]
Twitter: https://twitter.com/share?url=[post-url]&text=[post-title]&via=[via]&hashtags=[hashtags]
Telegram: https://t.me/share/url?url={url}&text={text}
Linkedin: https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title]

*/

// grab the share buttons

function prepare_share_links() {
    const telegram_btn = document.querySelector(".telegram-btn")
    const facebook_btn = document.querySelector(".facebook-btn")
    const twitter_btn = document.querySelector(".twitter-btn")
    const linkedin_btn = document.querySelector(".linkedin-btn")

    const post_url = encodeURI(window.location.href)
    const post_title = encodeURI(document.querySelector("#title").textContent)
    const post_text = encodeURI(document.querySelector("#article-content").children[0].textContent)
    const image = encodeURI(document.querySelector("#article-image-src"))


    telegram_btn.setAttribute("href", `https://t.me/share/url?url=${post_url}&text=${post_title}`)
    facebook_btn.setAttribute("href", `https://www.facebook.com/sharer.php?u=${post_url}`)
    twitter_btn.setAttribute("href", `https://twitter.com/share?url=${post_url}&text=${post_title}&via=bekhruz.com&hashtags=bekhruz.com`)
    linkedin_btn.setAttribute("href", `https://www.linkedin.com/shareArticle?url=${post_url}&title=${post_title}`)

}

function prepare_meta() {
    // facebook
    /* <meta property="og:url" content="https://www.your-domain.com/your-page.html" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Your Website Title" />
  <meta property="og:description" content="Your description" />
  <meta property="og:image" content="https://www.your-domain.com/path/image.jpg" />
   */
    document.querySelector('meta[property="og:url"]').content = document.location.href
    document.querySelector('meta[property="og:type"]').setAttribute("content", `website`);
    document.querySelector('meta[property="og:title"]').setAttribute("content", `${document.querySelector("#title").textContent}`);
    document.querySelector('meta[property="og:description"]').setAttribute("content", `${document.querySelector("#article-content").children[0].textContent}`);
    document.querySelector('meta[property="og:image"]').setAttribute("content", `${document.querySelector("#article-image-src").src}`);
    document.querySelector('meta[property="og:author"]').setAttribute("content", `${document.querySelector("#author-name").textContent}`);
    document.querySelector('meta[property="og:author-img"]').setAttribute("content", `${document.querySelector("#author-img-src").src}`);

    const meta_objects_list = {
        "url": document.location.href,
        "type": "website",
        "author": document.querySelector("#author-name").textContent,
        "author-img": document.querySelector("#author-img-src").src,
        "title": document.querySelector("#title").textContent,
        "description": document.querySelector("#article-content").children[0].textContent,
        "image": document.querySelector("#article-image-src").src,
    }

    for (const key in Object.keys(meta_objects_list)) {
        const meta = document.createElement("meta")
        meta.setAttribute("property", `og:${key}`)
        meta.content = meta_objects_list.key
    }
}

prepare_meta()
prepare_share_links()