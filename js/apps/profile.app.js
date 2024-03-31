export default class AppProfile extends HTMLElement {
  constructor() {
    // We are not even going to touch this.
    super();

    // let's create our shadow root
    this.shadowObj = this.attachShadow({ mode: "open" });

    this.render();
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    // console.log('We are inside connectedCallback');
  }

  disableScroll() {
    // Get the current page scroll position
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    document.body.classList.add("stop-scrolling");

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  enableScroll() {
    document.body.classList.remove("stop-scrolling");
    window.onscroll = function () { };
  }

  getDate = (isoDateStr) => {
    const dateIso = new Date(isoDateStr); // ISO strings with timezone are automatically handled
    let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // userTimezone.replace('%2F', '/')

    // Convert posted time to the current timezone
    const date = new Date(dateIso.toLocaleString('en-US', { timeZone: userTimezone }));

    return `
      ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
    `
  }

  getTemplate = () => {
    // Show HTML Here
    return `
      ${this.getBody()}
      ${this.getStyles()}
    `;
  }

  getBody = () => {
    const mql = window.matchMedia('(max-width: 660px)');
    if (mql.matches) {
      return /* html */`
        ${this.getHeader()}
        ${this.getBio()}
        ${this.checkFollowing(this.getAttribute('u-follow'))}
        ${this.getActions()}
        <div class="content-container">
          ${this.getStories()}
        </div>
      `;
    }
    else {
      return /* html */`
        <section class="main">
          ${this.getHeader()}
          ${this.getBio()}
          ${this.checkFollowing(this.getAttribute('u-follow'))}
          ${this.getActions()}
          <div class="content-container">
            ${this.getStories()}
          </div>
        </section>

        <section class="side">
          ${this.getDonateCard()}
          <topics-container url="/topics/popular"></topics-container>
        </section>
      `;
    }
  }

  getHeader = () => {
    return `
      <div class="head">
        <div class="data">
          <div class="name">
            <span class="user">
              <span class="code">${this.getAttribute('id')}</span>
              <span class="joined">${this.getDate(this.getAttribute('join-date'))}</span>
            </span>
            <p>Fredrick Ochieng</p>
          </div>
          <div class="users">
            <a href="" class="stat followers">
              <span class="no">${this.getAttribute('followers')}</span>
              <span class="text">Followers</span>
            </a>
            <span class="sp">•</span>
            <a href="" class="stat followers">
              <span class="no">${this.getAttribute('following')}</span>
              <span class="text">Following</span>
            </a>
          </div>
        </div>
        <div class="image">
          <img src=${this.getAttribute('img')} alt="Profile photo">
        </div>
      </div>
    `
  }

  getDonateCard = () => {
    return /* html */`
			<div class="donate-card">
        <h2 class="title">Support us</h2>
        <p class="info">Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        <a href="" class="link">Learn more</a>
      </div>
		`
  }

  getStories = () => {
    return `
      <stories-feed stories="all" url="/U0A89BA6/stories"></stories-feed>
    `
  }

  getOpinions = () => {
    return `
      <opinions-feed opinions="all" url="/U0A89BA6/opinions"></opinions-feed>
    `
  }

  getTab = () => {
    return /* html */`
      <ul id="tab" class="tab">
        <li data-element="stories" class="tab-item details active">
          <span class="text">Stories</span>
          <span class="line"></span>
        </li>
        <li data-element="opinions" class="tab-item opinions">
          <span class="text">Opinions</span>
          <span class="line"></span>
        </li>
        <li data-element="people" class="tab-item people">
          <span class="text">People</span>
          <span class="line"></span>
        </li>
      </ul>
    `
  }

  getActions = () => {
    return `
      <div class="actions">
        ${this.getAuthor()}
        ${this.getTab()}
      </div>
    `
  }

  getAuthor = () => {
    return `
      <div class="author">
        <span class="code">${this.getAttribute('id')}</span>
        <span class="sp">•</span>
        <span class="stories">
          <span class="no">${this.getAttribute('stories')}</span>
          <span class="text">Stories</span>
        </span>
      </div>
    `
  }

  getBio = () => {
    return `
      <p class="about">
        ${this.getAttribute('bio')}
      </p>
    `
  }

  checkFollowing = (following) => {
    if (following === 'true') {
      return `
			  <div class="action following">Following</div>
			`
    }
    else {
      return `
			  <div class="action follow">Follow</div>
			`
    }
  }

  getStyles() {
    return /* css */`
	    <style>
	      *,
	      *:after,
	      *:before {
	        box-sizing: border-box !important;
	        font-family: inherit;
	        -webkit-box-sizing: border-box !important;
	      }

	      *:focus {
	        outline: inherit !important;
	      }

	      *::-webkit-scrollbar {
	        width: 3px;
	      }

	      *::-webkit-scrollbar-track {
	        background: var(--scroll-bar-background);
	      }

	      *::-webkit-scrollbar-thumb {
	        width: 3px;
	        background: var(--scroll-bar-linear);
	        border-radius: 50px;
	      }

	      h1,
	      h2,
	      h3,
	      h4,
	      h5,
	      h6 {
	        padding: 0;
	        margin: 0;
	        font-family: inherit;
	      }

	      p,
	      ul,
	      ol {
	        padding: 0;
	        margin: 0;
	      }

	      a {
	        text-decoration: none;
	      }

	      :host {
          padding: 15px 0;
          margin: 0;
          display: flex;
          justify-content: space-between;
          gap: 0px;
          min-height: 60vh;
        }

        section.main {
          /* border: 1px solid #6b7280; */
          display: flex;
          flex-flow: column;
          align-items: start;
          gap: 0;
          width: 63%;
        }

        .head {
          /* border: 1px solid #6b7280; */
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          gap: 0;
          width: 100%;
        }

        .head * {
          transition: all 300ms ease-in-out;
          -webkit-transition: all 300ms ease-in-out;
          -moz-transition: all 300ms ease-in-out;
          -ms-transition: all 300ms ease-in-out;
          -o-transition: all 300ms ease-in-out;
        }

        .head > .data {
          /* border: 1px solid #6b7280; */
          display: flex;
          flex-flow: column;
          gap: 0px;
        }

        .head > .data > .name {
          /* border: 1px solid #6b7280; */
          display: flex;
          flex-flow: column;
          gap: 0;
        }

        .head > .data > .name > p {
          /* border: 1px solid #6b7280; */
          margin: 0;
          padding: 0;
          color: var(--text-color);
          font-family: var(--font-text);
          font-weight: 500;
          line-height: 1.4;
          font-size: 1.2rem;
        }

        .head > .data > .name > .user {
          /* border: 1px solid #6b7280; */
          margin: 0 0 10px 0;
          padding: 0;
          color: var(--gray-color);
          font-family: var(--font-text), sans-serif;
          font-weight: 400;
          line-height: 1.4;
          font-size: 1rem;
          display: flex;
          font-family: var(--font-mono), monospace;
          align-items: start;
          flex-flow: column;
          gap: 0;
        }

        .head > .data > .name > .user > span.code {
          /* border: 1px solid #6b7280; */
          margin: 0 0;
          padding: 0;
          color: transparent;
          background: var(--accent-linear);
          background-clip: text;
          -webkit-background-clip: text;
          font-family: var(--font-mono), monospace;
          font-weight: 400;
        }

        .head > .data > .name > .user > span.joined {
          font-size: 0.9rem;
          font-family: var(--font-text), sans-serif;
        }

        .head > .data > .users {
          /* border: 1px solid #6b7280; */
          margin: 0;
          padding: 0;
          color: var(--gray-color);
          font-family: var(--font-main), sans-serif;
          font-weight: 400;
          line-height: 1.4;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .head > .data > .users > a {
          text-decoration: none;
          color: inherit;
        }

        .head > .data > .users > a:hover {
          color: var(--accent-color);
        }

        .head > .data > .users > a > span.no {
          font-family: var(--font-mono), monospace;
          font-size: 0.9rem;
        }

        .head > .image {
          /* border: 1px solid #6b7280; */
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 90px;
          overflow: hidden;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }

        .head > .image > img {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          object-fit: cover;
          overflow: hidden;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }

        p.about {
          /* border: 1px solid #6b7280; */
          margin: 15px 0;
          padding: 0;
          color: var(--text-color);
          font-family: var(--font-text);
          font-weight: 400;
          line-height: 1.4;
          font-size: 1rem;
        }

        .action {
          border: var(--action-border);
          text-decoration: none;
          margin: 5px 0;
          padding: 8px 15px 7px;
          width: 100%;
          font-weight: 400;
          color: var(--gray-color);
          font-family: var(--font-text), sans-serif;
          font-size: 1.15rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: 12px;
          -webkit-border-radius: 12px;
          -moz-border-radius: 12px;
          -ms-border-radius: 12px;
          -o-border-radius: 12px;
        }

        .action.follow {
          border: var(--input-border-focus);
          color: transparent;
          background: var(--accent-linear);
          background-clip: text;
          -webkit-background-clip: text;
        }

        .actions {
          border-bottom: var(--story-border);
          background-color: var(--background);
          display: flex;
          flex-flow: column;
          gap: 0;
          z-index: 3;
          width: 100%;
          position: sticky;
          top: 60px;
        }

        .actions > .author {
          /* border-top: var(--story-border); */
          border-bottom: var(--story-border);
          padding: 10px 0;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 400;
          color: var(--gray-color);
          font-family: var(--font-mono), monospace;
          font-size: 0.9rem;
        }

        .actions > ul.tab {
          height: max-content;
          width: 100%;
          padding: 5px 0 0 0;
          margin: 0;
          list-style-type: none;
          display: flex;
          gap: 5px;
          align-items: center;
          max-width: 100%;
          overflow-x: scroll;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .actions > ul.tab::-webkit-scrollbar {
          display: none !important;
          visibility: hidden;
        }

        .actions > ul.tab > li.tab-item {
          position: relative;
          color: var(--gray-color);
          font-family: var(--font-text), sans-serif;
          font-weight: 400;
          padding: 6px 0 8px 0;
          margin: 0 0 0 10px;
          display: flex;
          align-items: center;
          cursor: pointer;
          /* font-size: 1rem; */
          font-size: 0.95rem;
        }

        .actions > ul.tab > li.tab-item:first-of-type {
          margin: 0 0 0 0;
        }

        .actions > ul.tab > li.tab-item.active {
          padding: 6px 10px 8px 10px;
          margin: 0;
        }
        .actions > ul.tab > li.tab-item:hover>.text {
          color: var(--accent-color);
        }

        .actions > ul.tab > li.active {
          font-size: 0.95rem;
          padding: 6px 10px 10px 10px;
        }

        .actions > ul.tab > li.active > .text {
          color: transparent;
          background: var(--accent-linear);
          background-clip: text;
          -webkit-background-clip: text;
          font-family: var(--font-text);
        }

        .actions > ul.tab > li.active > span.line {
          position: absolute;
          background: var(--accent-linear);
          display: inline-block;
          bottom: 0;
          right: 0;
          left: 0;
          min-height: 5px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        div.content-container {
          /* border: 1px solid #6b7280; */
          margin: 0;
          padding: 0;
          display: flex;
          flex-flow: column;
          align-items: start;
          flex-wrap: nowrap;
          gap: 15px;
          width: 100%;
        }

        section.side {
          /* border: 1px solid #53595f; */
          padding: 0;
          width: 35%;
          display: flex;
          flex-flow: column;
          gap: 20px;
          position: sticky;
          top: 60px;
          height: max-content;
        }

        section.side > .donate-card {
          /* border: 1px solid #ff0000; */
          padding: 0;
          width: 100%;
          display: flex;
          flex-flow: column;
          gap: 0;
        }

        section.side > .donate-card h2 {
          margin: 0;
          color: #1f2937;
          line-height: 1.5;
          font-weight: 600;
          font-family: var(--font-text), sans-serif;
        }

        section.side > .donate-card p {
          margin: 0;
          color: var(--text-color);
          line-height: 1.4;
        }

        section.side > .donate-card a {
          text-decoration: none;
          line-height: 1.4;
          width: max-content;
          color: var(--white-color);
          margin: 5px 0;
          padding: 4px 10px;
          font-weight: 400;
          background: var(--accent-linear);
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
        }

				@media screen and (max-width:660px) {
					:host {
						padding: 0;
            margin: 0;
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            gap: 0;
					}

          .actions > .author,
          .actions {
            border-bottom: var(--story-border-mobile);
          }


					.action,
					a {
						cursor: default !important;
          }

          .section.main {
            display: flex;
            flex-flow: column;
            gap: 0;
            width: 100%;
          }

          section.side {
            /* border: 1px solid #ff0000; */
            padding: 0;
            display: none;
            width: 0%;
          }
				}
	    </style>
    `;
  }
}