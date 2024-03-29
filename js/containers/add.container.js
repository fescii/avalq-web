export default class FormContainer extends HTMLElement {
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

  getTemplate = () => {
    // Show HTML Here
    return `
      ${this.getBody()}
      ${this.getStyles()}
    `;
  }

  getBody = () => {
    return /* html */`
      <p class="title"> What's on your mind?</p>
      <div class="options">
        <a href="/create/article" class="option article">Article</a>
        <a href="/create/post" class="option article">Post</a>
      </div>
    `;
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
          border-bottom: var(--story-border);
          background-color: var(--background);
          padding: 10px 0;
          display: flex;
          flex-flow: column;
          gap: 8px;
        }

        p.title {
          color: var(--text-color);
          font-family: var(--font-text), sans-serif;
          font-weight: 500;
          font-size: 1.1rem;
        }

        div.options {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 1rem;
          font-weight: 400;
          color: var(--gray-color);
          position: relative;
        }

        div.options > a.option {
          border: var(--action-border);
          color: var(--gray-color);
          background: var(--option-background);
          font-family: var(--font-text), sans-serif;
          cursor: pointer;
          text-decoration: none;
          padding: 2px 10px;
          font-weight: 500;
          width: 100px;
          cursor: pointer;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border-radius: 12px;
          -webkit-border-radius: 12px;
          -moz-border-radius: 12px;
        }

				@media screen and (max-width:660px) {
					:host {
						padding: 10px 0;
            border-bottom: var(--story-border-mobile);
            gap: 10px;
					}

          div.options {
            display: flex;
            align-items: flex-start;
            gap: 18px;
          }

          div.options > a.option {
            border: var(--border-mobile);
            cursor: default !important;
            color: var(--gray-color);
            font-family: var(--font-text), sans-serif;
            padding: 3px 10px;
            font-weight: 600;
            width: 100px;
          }
				}
	    </style>
    `;
  }
}