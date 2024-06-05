export default class AuthorWrapper extends HTMLElement {
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

    const contentContainer = this.shadowObj.querySelector('div.content-container');

    this.fetchContent(contentContainer);
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

  fetchContent = (contentContainer) => {
    const outerThis = this;
    const storyLoader = this.shadowObj.querySelector('post-loader');
    const content = this.getContent();
    setTimeout(() => {
      storyLoader.remove();
      contentContainer.insertAdjacentHTML('beforeend', content);
      outerThis.expandCollapse();
    }, 2000)
  }

  // Expand and collapse the author info
  expandCollapse = () => {
    // mql is a media query list
    const mql = window.matchMedia('(max-width: 660px)');

    // check if the screen is mobile
    if (mql.matches) {
      const contentContainer = this.shadowObj.querySelector('div.content-container');
      const svg = this.shadowObj.querySelector('svg');

      // check if the content container and svg exist
      if (contentContainer && svg) {

        // Select bio, stats, and actions
        const bio = this.shadowObj.querySelector('.bio');
        const stats = this.shadowObj.querySelector('.stats');
        const actions = this.shadowObj.querySelector('.actions');

        if (bio && stats && actions) {

          // Add event listener to the svg
          svg.addEventListener('click', () => {
            // if the content container is expanded, collapse it
            if (contentContainer.dataset.expanded === 'false') {
              // add gap to the content container
              contentContainer.style.gap = '8px';

              // Set the height to max for bio, stats, and actions
              stats.style.setProperty('max-height', 'max-content');
              bio.style.setProperty('max-height', 'max-content');
              actions.style.setProperty('max-height', 'max-content');

              // Collapse the content container
              svg.style.transform = 'rotate(180deg)';
              contentContainer.dataset.expanded = 'true';
            }
            else {
              // Remove gap from the content container
              contentContainer.style.gap = '0';

              // Set the height to 0 for bio, stats, and actions
              actions.style.setProperty('max-height', '0');
              bio.style.setProperty('max-height', '0');
              stats.style.setProperty('max-height', '0');

              // Expand the content container
              svg.style.transform = 'rotate(0deg)';
              contentContainer.dataset.expanded = 'false';
            }
          })
        }
      }
    }
  }

  formatNumber = n => {
    if (n >= 0 && n <= 999) {
      return n.toString();
    } else if (n >= 1000 && n <= 9999) {
      const value = (n / 1000).toFixed(2);
      return `${value}k`;
    } else if (n >= 10000 && n <= 99999) {
      const value = (n / 1000).toFixed(1);
      return `${value}k`;
    } else if (n >= 100000 && n <= 999999) {
      const value = (n / 1000).toFixed(0);
      return `${value}k`;
    } else if (n >= 1000000 && n <= 9999999) {
      const value = (n / 1000000).toFixed(2);
      return `${value}M`;
    } else if (n >= 10000000 && n <= 99999999) {
      const value = (n / 1000000).toFixed(1);
      return `${value}M`;
    } else if (n >= 100000000 && n <= 999999999) {
      const value = (n / 1000000).toFixed(0);
      return `${value}M`;
    } else {
      return "1B+";
    }
  }

  parseToNumber = num_str => {
    // Try parsing the string to an integer
    const num = parseInt(num_str);

    // Check if parsing was successful
    if (!isNaN(num)) {
      return num;
    } else {
      return 0;
    }
  }

  getTemplate() {
    // Show HTML Here
    return `
      ${this.getBody()}
      ${this.getStyles()}
    `;
  }

  getBody = () => {
    return /* html */`
      <div data-expanded="false" class="content-container">
        ${this.getLoader()}
      </div>
    `
  }

  getContent = () => {
    return /* html */`
      ${this.getSvg()}
		  ${this.getHeader()}
      ${this.getStats()}
      ${this.getBio()}
      ${this.getActions()}
		`
  }

  getSvg = () => {
    // check if screen is mobile using mql
    const mql = window.matchMedia('(max-width: 660px)');

    // check if the screen is mobile
    if (mql.matches) {
      return /* html */`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
        </svg>
      `
    }
    else {
      return ''
    }
  }

  getHeader = () => {
    // Get name and check if it's greater than 20 characters
    const name = this.getAttribute('name');

    // GET url
    const url = this.getAttribute('url');

    // Check if the name is greater than 20 characters: replace the rest with ...
    let displayName = name.length > 20 ? `${name.substring(0, 20)}..` : name;

    return /* html */ `
      <div class="top">
        <div class="avatar">
          <img src="${this.getAttribute('picture')}" alt="Author name">
          ${this.checkVerified(this.getAttribute('verified'))}
        </div>
        <div class="name">
          <h4 class="name">
            <span class="name">${displayName}</span>
          </h4>
          <a href="${url.toLowerCase()}" class="username">
            <span class="text">${this.getAttribute('username')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M4.53 4.75A.75.75 0 0 1 5.28 4h6.01a.75.75 0 0 1 .75.75v6.01a.75.75 0 0 1-1.5 0v-4.2l-5.26 5.261a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L9.48 5.5h-4.2a.75.75 0 0 1-.75-.75Z" />
            </svg>
          </a>
        </div>
      </div>
    `
  }

  checkVerified = verified => {
    if (verified === 'true') {
      return /*html*/`
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
            <path  d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
          </svg>
        </div>
			`
    }
    else {
      return ''
    }
  }

  getStats = () => {
    // Get total followers & following and parse to integer
    const followers = this.getAttribute('followers') || 0;
    const following = this.getAttribute('following') || 0;

    // Convert the followers & following to a number
    const totalFollowers = this.parseToNumber(followers);
    const totalFollowing = this.parseToNumber(following);

    //  format the number
    const followersFormatted = this.formatNumber(totalFollowers);
    const followingFormatted = this.formatNumber(totalFollowing);


    return /* html */`
      <div class="stats">
        <span class="stat">
          <span class="number">${followersFormatted}</span>
          <span class="label">Followers</span>
        </span>
        <span class="sp">•</span>
        <span class="stat">
          <span class="number">${followingFormatted}</span>
          <span class="label">Following</span>
        </span>
      </div>
		`
  }

  getBio = () => {
    // Get bio content
    const bio = this.innerHTML;

    // separate by new lines and wrap each line in a paragraph tag
    const bioLines = bio.split('\n').map(line => `<p>${line}</p>`).join('');

    return /*html*/`
      <div class="bio">
        ${bioLines}
      </div>
    `
  }

  getActions() {
    return /*html*/`
      <div class="actions">
        ${this.checkFollowing(this.getAttribute('user-follow'))}
      </div>
    `;
  }

  checkFollowing = following => {
    if (following === 'true') {
      return /*html*/`
			  <a href="" class="action">Following</a>
			`
    }
    else {
      return /*html*/`
			  <a href="" class="action follow">Follow</a>
			`
    }
  }

  getLoader = () => {
    return `
			<post-loader speed="300"></post-loader>
		`
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
          -webkit-appearance: none;
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
          font-size: 16px;
          padding: 0;
          width: 100%;
          display: flex;
          flex-flow: column;
          align-items: start;
          gap: 0px;
        }

        .content-container {
          position: relative;
          width: 100%;
          display: flex;
          flex-flow: column;
          align-items: start;
          gap: 8px;
        }

        .content-container > svg {
          display: none;
        }

        .top {
          display: flex;
          width: 100%;
          flex-flow: row;
          align-items: center;
          gap: 5px;
        }

        .top > .avatar {
          position: relative;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
        }

        .top > .avatar > img {
          width: 100%;
          height: 100%;
          overflow: hidden;
          object-fit: cover;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
        }

        .top > .avatar > .icon {
          background: var(--background);
          position: absolute;
          bottom: -1px;
          right: -2px;
          width: 20px;
          height: 20px;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .top > .avatar > .icon svg {
          width: 15px;
          height: 15px;
          color: var(--accent-color);
        }

        .top > .name {
          display: flex;
          justify-content: center;
          flex-flow: column;
          gap: 0;
        }

        .top > .name > h4.name {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--text-color);
          font-family: var(--font-text), sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .top > .name > h4.name svg {
          color: var(--alt-color);
          margin: 5px 0 0 0;
        }

        .top > .name > a.username {
          color: var(--gray-color);
          font-family: var(--font-mono), monospace;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          display: flex;
          gap: 2px;
          align-items: center;
        }

        .top > .name > a.username svg {
          color: var(--gray-color);
          width: 15px;
          height: 15px;
          margin: 3px 0 0 0;
        }

        .top > .name > a.username:hover {
          color: transparent;
          background: var(--accent-linear);
          background-clip: text;
          -webkit-background-clip: text;
        }

        .top > .name > a.username:hover svg {
          color: var(--accent-color);
        }

        .stats {
          color: var(--gray-color);
          display: flex;
          width: 100%;
          flex-flow: row;
          align-items: center;
          gap: 10px;
        }

        .stats > .stat {
          display: flex;
          flex-flow: row;
          align-items: center;
          gap: 5px;
        }

        .stats > .stat > .label {
          color: var(--gray-color);
          font-family: var(--font-main), sans-serif;
          text-transform: lowercase;
          font-size: 1rem;
          font-weight: 400;
        }

        .stats > .stat > .number {
          color: var(--text-color);
          font-family: var(--font-main), sans-serif;
          font-size: 0.84rem;
          font-weight: 500;
        }

        .bio {
          display: flex;
          flex-flow: column;
          gap: 5px;
          color: var(--text-color);
          font-family: var(--font-text), sans-serif;
          font-size: 1rem;
          line-height: 1.4;
          font-weight: 400;
        }

        .bio > p {
          all: inherit;
        }

        .actions {
          display: flex;
          width: 100%;
          flex-flow: row;
          align-items: center;
          gap: 10px;
          margin: 5px 0;
        }

        .actions > a.action {
          border: var(--action-border);
          text-decoration: none;
          display: flex;
          width: 100%;
          flex-flow: row;
          align-items: center;
          justify-content: center;
          padding: 7px 20px;
          border-radius: 10px;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          color: var(--text-color);
          -ms-border-radius: 10px;
          -o-border-radius: 10px;
        }

        .actions > a.action.follow {
          border: none;
          background: var(--accent-linear);
          color: var(--white-color);
           border-radius: 10px;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          -ms-border-radius: 10px;
          -o-border-radius: 10px;
        }

        @media screen and (max-width: 660px) {
          .content-container {
            border-top: var(--border-mobile);
            border-bottom: var(--border-mobile);
            position: relative;
            padding: 10px 0;
            width: 100%;
            max-height: max-content;
            display: flex;
            flex-flow: column;
            align-items: start;
            gap: 0;
            transition: all 0.3s ease;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
          }

          .content-container > .stats,
          .content-container > .bio,
          .content-container > .actions {
            transition: all 0.5s ease;
            max-height: 0;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }

          ::-webkit-scrollbar {
            -webkit-appearance: none;
          }

          a,
          .stats > .stat {
            cursor: default !important;
          }

          a,
          span.stat,
          span.action {
            cursor: default !important;
          }

          .content-container > svg {
            display: inline-block;
            position: absolute;
            top: 18px;
            right: 5px;
            color: var(--gray-color);
            cursor: default !important;
            width: 22px;
            height: 22px;
            transition: all 0.5s ease;
          }

          .top > .avatar {
            width: 40px;
            height: 40px;
          }

          .top > .name > h4.name {
            color: var(--text-color);
            font-family: var(--font-read), sans-serif;
            font-size: 1rem;
            font-weight: 500;
          }

          .top > .name > h4.name svg {
            color: var(--alt-color);
            margin: 4px 0 0 0;
            width: 15px;
            height: 15px;
          }

          .top > .name > a.username {
            color: var(--gray-color);
            font-family: var(--font-mono), monospace;
            font-size: 0.83rem;
            font-weight: 500;
            text-decoration: none;
            display: flex;
            gap: 2px;
            align-items: center;
          }
        }
      </style>
    `;
  }
}