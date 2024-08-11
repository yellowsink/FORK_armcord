import {ipcRenderer} from "electron";
interface IPCSources {
    id: string;
    name: string;
    thumbnail: HTMLCanvasElement;
}
async function addDisplays(): Promise<void> {
    ipcRenderer.once("getSources", (_event, arg) => {
        let sources: IPCSources[] = arg;
        console.log(sources);
        const selectionElem = document.createElement("div");
        selectionElem.classList.add("desktop-capturer-selection");
        selectionElem.innerHTML = `<div class="desktop-capturer-selection__scroller">
    <ul class="desktop-capturer-selection__list">
      ${sources
          .map(
              ({id, name, thumbnail}) => `
        <li class="desktop-capturer-selection__item">
          <button class="desktop-capturer-selection__btn" data-id="${id}" title="${name}">
            <img class="desktop-capturer-selection__thumbnail" src="${thumbnail.toDataURL()}" />
            <span class="desktop-capturer-selection__name">${name}</span>
          </button>
        </li>
      `
          )
          .join("")}
      <li class="desktop-capturer-selection__item">
        <button class="desktop-capturer-selection__btn" data-id="screen-cancel" title="Cancel">
          <span class="desktop-capturer-selection__name desktop-capturer-selection__name--cancel">Cancel</span>
        </button>
      </li>
    </ul>
    </div>
    <div class="switch">
            <label class="header">Share system audio</label>
            <input id="audio" class="tgl tgl-light left" type="checkbox" />
            <label class="tgl-btn left" for="audio"></label>
    </div>
    `;
        document.body.appendChild(selectionElem);
        document.querySelectorAll(".desktop-capturer-selection__btn").forEach((button) => {
            button.addEventListener("click", async () => {
                try {
                    const id = button.getAttribute("data-id");
                    const title = button.getAttribute("title");
                    if (id === "${CANCEL_ID}") {
                        throw new Error("Cancelled by user");
                    } else {
                        const audioElement: HTMLInputElement | null = document.getElementById(
                            "audio"
                        ) as HTMLInputElement;
                        ipcRenderer.sendSync("selectScreenshareSource", id, title, audioElement.checked);
                    }
                } catch (err) {
                    console.error(err);
                }
            });
        });
    });
}
addDisplays();
