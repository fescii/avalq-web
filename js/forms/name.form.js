export default class FormName extends HTMLElement {
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

  getTemplate() {
    // Show HTML Here
    return `
      ${this.getBody()}
      ${this.getStyles()}
    `;
  }

  getBody = () => {
    return /* html */`
      <div class="top">
        <h4 class="title">Your name</h4>
        <p class="desc">
          Your name is how people will find you on the platform. You can use your real name or a nickname.
          Both first and last name fields can't be empty.
        </p>
      </div>
      <form class="fields initial" id="name-form">
        <div class="field bio">
          <div class="input-group firstname">
            <label for="firstname" class="center">First name</label>
            <input data-name="firstname" type="text" name="firstname" id="firstname" placeholder="Enter your first name"
             value="${this.getAttribute('first-name')}" required>
            <span class="status">First name is required</span>
          </div>
          <div class="input-group lastname">
            <label for="lastname" class="center">Last name</label>
            <input data-name="lastname" type="text" name="lastname" id="lastname" value="${this.getAttribute('last-name')}" placeholder="Enter your last name" required>
            <span class="status">Last name is required</span>
          </div>
        </div>
        <div class="actions">
          <button type="submit" class="action next">
            <span class="text">Update name</span>
          </button>
        </div>
      </form>
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
        display: flex;
        flex-flow: column;
        gap: 10px;
        padding: 0;
        width: 100%;
      }

      .top {
        display: flex;
        flex-flow: column;
        gap: 5px;
        padding: 0;
        width: 100%;
      }

      .top > h4.title {
        border-bottom: var(--story-border-mobile);
        display: flex;
        align-items: center;
        color: var(--title-color);
        font-size: 1.3rem;
        font-weight: 500;
        margin: 0;
        padding: 0 0 6px 0;
      }

      .top > .desc {
        margin: 0;
        padding: 10px 0;
        color: var(--gray-color);
        font-size: 1rem;
        font-family: var(--font-main), sans-serif;
      }

      form.fields {
        margin: 0;
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
      }

      form.fields > .field {
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: start;
        gap: 20px;
      }

      form.fields.center > .field {
        align-items: center;
      }

      form.fields .field .input-group {
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: start;
        color: var(--text-color);
        gap: 5px;
        position: relative;
        transition: border-color 0.3s ease-in-out;
      }

      form.fields .field.bio .input-group {
        width: 100%;
      }

      form.fields .field.bio .input-group.code,
      form.fields .field.bio .input-group.email {
        grid-column: 1/3;
        width: 100%;
      }

      form.fields .field .input-group > svg {
        position: absolute;
        right: 10px;
        top: 38px;
        width: 20px;
        height: 20px;
      }

      form.fields .field .input-group > svg {
        display: none;
      }

      form.fields .field .input-group.success > svg {
        display: inline-block;
      }

      form.fields .field .input-group.failed > svg {
        display: inline-block;
      }

      form.fields .field .input-group.success > svg {
        color: var(--accent-color);
      }

      form.fields .field .input-group.failed > svg {
        color: var(--error-color);
      }

      form.fields label {
        padding: 0 0 5px 0;
        color: var(--text-color);
      }

      form.fields .field.bio label {
        padding: 0 0 0 5px;
      }

      form.fields label {
        color: var(--text-color);
        font-size: 1.1rem;
        font-family: var(--font-main), sans-serif;
        transition: all 0.3s ease-in-out;
        pointer-events: none;
      }

      form.fields .field input {
        border: var(--input-border);
        font-size: 1rem;
        width: 100%;
        height: 40px;
        outline: none;
        padding: 10px 12px;
        border-radius: 12px;
        color: var(--text-color);
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        -ms-border-radius: 12px;
        -o-border-radius: 12px;
      }

      form.fields .field input:focus {
        border: var(--input-border-focus);
      }

      form.fields .field span.wrapper {
        display: flex;
        align-items: center;
        align-items: center;
        gap: 0;
        width: 100%;
      }

      form.fields .field .input-group.success > span.wrapper > input,
      form.fields .field .input-group.success > span.wrapper > input:focus,
      form.fields .field .input-group.success input,
      form.fields .field .input-group.success input:focus {
        border: var(--input-border-focus);
      }

      form.fields .field .input-group.failed > span.wrapper > input,
      form.fields .field .input-group.failed > span.wrapper > input:focus,
      form.fields .field .input-group.failed input,
      form.fields .field .input-group.failed input:focus {
        border: var(--input-border-error);
      }

      form.fields .field .input-group.success span.wrapper > input,
      form.fields .field .input-group.success input {
        color: var(--accent-color);
      }

      form.fields .field .input-group.failed span.wrapper > input,
      form.fields .field .input-group.failed input {
        color: var(--error-color);
      }

      form.fields label.focused {
        top: -10px;
        font-size: 0.9rem;
        background-color: var(--label-focus-background);
        padding: 0 5px;
      }

      form.fields .field span.status {
        color: var(--error-color);
        font-size: 0.95rem;
        display: none;
        padding: 0 0 0 5px;
      }

      form.fields .field .input-group.failed span.status {
        color: var(--error-color);
        font-size: 0.8rem;
        display: inline-block;
      }

      form.fields .field .input-group.success span.status {
        color: var(--accent-color);
        font-size: 0.8rem;
        display: inline-block;
      }

      form.fields .field .input-group.success span.status {
        display: none;
      }

      form.fields .actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 0 0 0 2px;
      }

      form.fields .actions > .action {
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        gap: 5px;
        border: none;
        border-radius: 10px;
        font-family: var(--font-main), sans-serif;
        line-height: 1.2;
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-color);
        width: max-content;
        padding: 8px 20px;
        height: 40px;
        cursor: pointer;
        position: relative;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        -ms-border-radius: 10px;
        -o-border-radius: 10px;
      }

      form.fields .actions > .action.prev svg path {
        fill: var(--text-color);
      }

      form.fields .actions > .action.next {
        color: var(--white-color);
        background: var(--stage-no-linear);
      }

      form.fields .actions > .action.next svg path {
        fill: var(--white-color);
      }

      form.fields .actions > .action.disabled {
        pointer-events: none;
      }
      @media screen and (max-width:660px) {
        ::-webkit-scrollbar {
          -webkit-appearance: none;
        }
      }
    </style>
    `;
  }
}