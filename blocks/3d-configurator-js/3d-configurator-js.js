import { loadCSS } from "../../scripts/aem.js";

let toggleLightFlag = false;
let toggleORVMFlag = false;
let toggleDoorFlag = false;
let toggleWheelFlag = false;
let changeBackgroundFlag = "Night";
let changeCarColorFlag = "Fire_Red";
let inProgress = false;
let accessoryFlag = null;
const ACCESSORY_LIST = {
  CAM_SIDE_UNDER_SPOILER: [
    "COMMON_ACC_EX_SIDE_UNDERBODY_SPOILER_BLACK",
    "COMMON_ACC_EX_SIDE_UNDERBODY_SPOILER_PRIMERED",
  ],
  CAM_SIDE_MOULDING: [
    "COMMON_ACC_EX_SIDE_MOULDING_WHITE_INSERT",
    "COMMON_ACC_EX_SIDE_MOULDING_PRIMERED_INSERT",
    "COMMON_ACC_EX_SIDE_MOULDING_RED_INSERT",
    "COMMON_ACC_EX_SIDE_MOULDING_CHROME_INSERT",
  ],
  CAM_ROOF_SPOILER: [
    "COMMON_ACC_EX_ROOF_END_SPOILER_BLACK_WHITE",
    "COMMON_ACC_EX_ROOF_END_SPOILER_BLACK_RED",
    "COMMON_ACC_EX_ROOF_END_SPOILER_BLACK",
  ],
  CAM_REAR_MID_GARNISH: [
    "COMMON_ACC_EX_REAR_MID_GARNISH_BLACK",
    "COMMON_ACC_EX_REAR_MID_GARNISH",
  ],
  CAM_MUDFLAP: ["COMMON_ACC_EX_MUDFLAP"],
  CAM_F_UNDER_SPOILER: [
    "COMMON_ACC_EX_F_UNDERBODY_SPOILER_PRIMERED",
    "COMMON_ACC_EX_F_UNDERBODY_SPOILER_BLACK'",
  ],
  CAM_FRONT_GRILL_GARNISH: [
    "COMMON_ACC_EX_FRONT_GRILL_GARNISH_SILVER_INSERT",
    "COMMON_ACC_EX_FRONT_GRILL_GARNISH_WHITE_INSERT",
    "COMMON_ACC_EX_FRONT_GRILL_GARNISH_ORANGE_INSERT",
    "COMMON_ACC_EX_FRONT_GRILL_GARNISH_RED_INSERT",
    "COMMON_ACC_EX_FRONT_GRILL_GARNISH_BLUE_INSERT",
    "COMMON_ACC_EX_FRONT_GRILL_GARNISH_GREY_INSERT",
  ],
  CAM_DOOR_VISOSR: [
    "COMMON_ACC_EX_DOOR_VISOR_MESH",
    "COMMON_ACC_EX_DOOR_VISOR_CHROME_MESH",
  ],
  CAM_ACC_FOGLAMP: ["COMMON_ACC_EX_FOG_LAMP_GARNISH"],
  CAM_ACC_WHEELARC: [
    "COMMON_ACC_EX_WHEEL_ARCH_BLACK",
    "COMMON_ACC_EX_WHEEL_ARCH_BLACK_RED",
    "COMMON_ACC_EX_WHEEL_ARCH_BLACK_WHITE",
    "COMMON_ACC_EX_WHEEL_ARCH_PRIMERED",
  ],
  CAM_ACC_WINDOWFRAME: ["COMMON_ACC_EX_WINDOWS_FRAME_KIT"],
  CAM_ACC_STYLINGKIT: [
    "COMMON_IN_ACC_STYLING_KIT_MESH",
    "COMMON_IN_ACC_STYLING_CARBON_GRAY",
    "COMMON_IN_ACC_STYLING_CARBON_BLUE",
    "COMMON_IN_ACC_STYLING_CARBON_RED",
  ],
  CAM_FLOOR_MAT: ["COMMON_IN_ACC_WEATHER_3D_MAT"],
  CAM_ACC_GRILL_GARNISH: ["COMMON_ACC_EX_FRONT_GRILL_GARNISH"],
  CAM_REAR_UNDER_SPOILER: [
    "COMMON_ACC_EX_REAR_UNDERBODY_SPOILER_WHITE_INSERT",
    "COMMON_ACC_EX_REAR_UNDERBODY_SPOILER_RED_INSERT",
    "COMMON_ACC_EX_REAR_UNDERBODY_SPOILER_PRIMERED_INSERT",
  ],
};

const configuratorLoad = (pTagArray) => {
  var script = document.createElement("script");
  script.src =
    pTagArray[0].innerText +
    "one3d/project/" +
    pTagArray[2].innerText +
    "/player/one3d_functions.min.js";
  script.type = "text/javascript";
  script.onload = function () {
    ONE3D.init(
      "one3d",
      pTagArray[0].innerText + "one3d/",
      pTagArray[2].innerText,
      pTagArray[3].innerText,
      {
        showDefaultLoader: true,
        color: pTagArray[1].innerText,
        onProgress: (e) => {
          console.log(e);
        },
      }
    )
      .then((SuccessData) => {
        loadDialogController();
        console.log("Success!!", SuccessData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  document.getElementsByTagName("head")[0].appendChild(script);
};

const exteriorView = (e) => {
  document.getElementById("control-panel").classList.add("control-disabled");
  window &&
    window.ONE3D.exteriorView().then(() => {
      document
        .getElementById("control-panel")
        .classList.remove("control-disabled");
    });
};
const interiorView = () => {
  document.getElementById("control-panel").classList.add("control-disabled");
  window &&
    window.ONE3D.interiorView().then(() => {
      document
        .getElementById("control-panel")
        .classList.remove("control-disabled");
    });
};
const backseatView = () => {
  document.getElementById("control-panel").classList.add("control-disabled");
  window &&
    window.ONE3D.backseatView().then(() => {
      document
        .getElementById("control-panel")
        .classList.remove("control-disabled");
    });
};
const frontseatView = () => {
  document.getElementById("control-panel").classList.add("control-disabled");
  window &&
    window.ONE3D.frontseatView().then(() => {
      document
        .getElementById("control-panel")
        .classList.remove("control-disabled");
    });
};
const toggleLights = (e) => {
  toggleLightFlag = e.target.checked;
  document.getElementById("control-panel").classList.add("control-disabled");
  if (e.target.checked) {
    window &&
      window.ONE3D.toggleLights(true).then(() => {
        document
          .getElementById("control-panel")
          .classList.remove("control-disabled");
      });
  } else {
    window &&
      window.ONE3D.toggleLights(false).then(() => {
        document
          .getElementById("control-panel")
          .classList.remove("control-disabled");
      });
  }
};
const toggleORVM = (e) => {
  toggleORVMFlag = e.target.checked;
  document.getElementById("control-panel").classList.add("control-disabled");
  if (e.target.checked) {
    window &&
      window.ONE3D.toggleORVM(true).then(() => {
        document
          .getElementById("control-panel")
          .classList.remove("control-disabled");
      });
  } else {
    window &&
      window.ONE3D.toggleORVM(false).then(() => {
        document
          .getElementById("control-panel")
          .classList.remove("control-disabled");
      });
  }
};

const toggleDoor = (e) => {
  toggleDoorFlag = e.target.checked;
  document.getElementById("control-panel").classList.add("control-disabled");

  if (e.target.checked) {
    window &&
      window.ONE3D.toggleDoors(true).then(() => {
        document
          .getElementById("control-panel")
          .classList.remove("control-disabled");
      });
  } else {
    window &&
      window.ONE3D.toggleDoors(false).then(() => {
        document
          .getElementById("control-panel")
          .classList.remove("control-disabled");
      });
  }
};
const toggleWheel = (e) => {
  toggleWheelFlag = e.target.checked;
  document.getElementById("control-panel").classList.add("control-disabled");
  if (e.target.checked) {
    window &&
      window.ONE3D.toggleWheel(true)
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          document
            .getElementById("control-panel")
            .classList.remove("control-disabled");
        });
  } else {
    window &&
      window.ONE3D.toggleWheel(false)
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          document
            .getElementById("control-panel")
            .classList.remove("control-disabled");
        });
  }
};

const handleBackgroundChange = (event) => {
  changeBackgroundFlag = event.target.value;
  document.getElementById("control-panel").classList.add("control-disabled");
  if (
    event.target.value === "Day" ||
    event.target.value === "Night" ||
    event.target.value === "Studio"
  ) {
    window &&
      window.ONE3D.ChangeEnv(event.target.value)
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          document
            .getElementById("control-panel")
            .classList.remove("control-disabled");
        });
  } else {
    document
      .getElementById("control-panel")
      .classList.remove("control-disabled");
    console.error("Invalid value selected:", event.target.value);
  }
};
const handleCarColorChange = (event) => {
  changeCarColorFlag = event.target.value;
  document.getElementById("control-panel").classList.add("control-disabled");
  window &&
    window.ONE3D.changeColor(event.target.value)
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        document
          .getElementById("control-panel")
          .classList.remove("control-disabled");
      });
};

const toggleCinematic = (controlPanel) => {
  const controlDisabledDiv = document.getElementById("control-disabled-div");
  controlDisabledDiv.classList.add("control-disabled");
  removeViewCinematic(controlPanel);
  loadExitCinematic(controlPanel);
  window && window.ONE3D.startCinematic();
};
const exitCinematic = (controlPanel) => {
  const controlDisabledDiv = document.getElementById("control-disabled-div");
  controlDisabledDiv.classList.remove("control-disabled");
  removeExitCinematic(controlPanel);
  loadViewCinematic(controlPanel);
  window && window.ONE3D.exitCinematic();
};

const handle360 = () => {
  const controlDisabledDiv = document.getElementById("control-disabled-div");
  accessoryFlag = null;
  window && window.ONE3D.exitAccessoriesView();
  window && window.ONE3D.removeAllAccessories();
  removeAccessoryItems(controlDisabledDiv);
  load360Items(controlDisabledDiv);
};

const handleAccessory = () => {
  const controlDisabledDiv = document.getElementById("control-disabled-div");
  remove360Items(controlDisabledDiv);
  loadAccessoryItems(controlDisabledDiv);
};

const handleAccessoryList = (event) => {
  accessoryFlag = event.target.value;
  if (event.target.value !== null) {
    window && window.ONE3D.setAccessorieCamera(event.target.value);
  }
  const selectControl = document.getElementById("select-control-accessory");
  if (accessoryFlag && ACCESSORY_LIST[accessoryFlag]) {
    const accessorySection = document.createElement("div");
    accessorySection.id = "accessory-section";
    accessorySection.classList.add("accessory-section");
    ACCESSORY_LIST[accessoryFlag].forEach((accessory) => {
      const span = document.createElement("span");
      span.classList.add("accessory-option-text");
      span.innerText = accessory;
      accessorySection.appendChild(span);

      const addRemoveButtons = document.createElement("div");
      addRemoveButtons.classList.add("add-remove-buttons");

      const addButton = document.createElement("button");
      addButton.innerText = "add";
      addButton.addEventListener("click", () => addAccessory(accessory));
      addRemoveButtons.appendChild(addButton);

      const removeButton = document.createElement("button");
      removeButton.innerText = "remove";
      removeButton.addEventListener("click", () => removeAccessory(accessory));
      addRemoveButtons.appendChild(removeButton);

      accessorySection.appendChild(addRemoveButtons);
    });
    selectControl.appendChild(accessorySection);
  } else {
    const accessorySection = document.getElementById("accessory-section");
    selectControl.removeChild(accessorySection);
  }
};

const addAccessory = (accessory) => {
  document.getElementById("control-panel").classList.add("control-disabled");
  window &&
    window.ONE3D.addAccessory(accessory).then(() => {
      document
        .getElementById("control-panel")
        .classList.remove("control-disabled");
    });
};
const removeAccessory = (accessory) => {
  document.getElementById("control-panel").classList.add("control-disabled");
  window &&
    window.ONE3D.removeAccessory(accessory).then(() => {
      document
        .getElementById("control-panel")
        .classList.remove("control-disabled");
    });
};

const load360Items = (controlDisabledDiv) => {
  const viewSection = document.createElement("div");
  viewSection.id = "view-section";
  viewSection.classList.add("view-section");

  const viewSpan = document.createElement("span");
  viewSpan.innerText = "View";
  viewSection.appendChild(viewSpan);

  const viewButtons = document.createElement("div");
  viewButtons.classList.add("view-buttons");

  const buttonBackseat = document.createElement("button");
  buttonBackseat.type = "button";
  buttonBackseat.classList.add("view-button", "backseat");
  buttonBackseat.innerText = "Back Seat";
  buttonBackseat.addEventListener("click", backseatView);
  viewButtons.appendChild(buttonBackseat);

  const buttonFrontseat = document.createElement("button");
  buttonFrontseat.type = "button";
  buttonFrontseat.classList.add("view-button", "frontseat");
  buttonFrontseat.innerText = "Front Seat";
  buttonFrontseat.addEventListener("click", frontseatView);
  viewButtons.appendChild(buttonFrontseat);

  viewSection.appendChild(viewButtons);
  controlDisabledDiv.appendChild(viewSection);

  const microInteraction = document.createElement("div");
  microInteraction.id = "micro-interaction";
  microInteraction.classList.add("micro-interaction");

  const microSpan = document.createElement("span");
  microSpan.innerText = "Micro Interaction";
  microInteraction.appendChild(microSpan);

  const createToggle = (labelText, id, checked, onChangeHandler) => {
    const label = document.createElement("label");
    label.classList.add(`toggle-${id}`);

    const span = document.createElement("span");
    span.classList.add("option-text");
    span.innerText = labelText;
    label.appendChild(span);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `${id}-toggle`;
    input.checked = checked;
    input.addEventListener("change", onChangeHandler);
    label.appendChild(input);

    const sliderSpan = document.createElement("span");
    sliderSpan.classList.add("slider");
    if (inProgress) sliderSpan.classList.add("slider-disabled");
    label.appendChild(sliderSpan);

    return label;
  };

  microInteraction.appendChild(
    createToggle("Toggle Light", "light", toggleLightFlag, toggleLights)
  );
  microInteraction.appendChild(
    createToggle("Toggle ORVM", "orvm", toggleORVMFlag, toggleORVM)
  );
  microInteraction.appendChild(
    createToggle("Toggle Door", "door", toggleDoorFlag, toggleDoor)
  );
  microInteraction.appendChild(
    createToggle("Toggle Wheel", "wheel", toggleWheelFlag, toggleWheel)
  );
  controlDisabledDiv.appendChild(microInteraction);

  const createSelectControl = (
    labelText,
    id,
    value,
    options,
    onChangeHandler
  ) => {
    const selectControl = document.createElement("div");
    selectControl.id = `select-control-${id}`;
    selectControl.classList.add("select-control", id);

    const label = document.createElement("label");
    label.htmlFor = `${id}-select`;
    label.innerText = labelText;
    selectControl.appendChild(label);

    const select = document.createElement("select");
    select.id = `${id}-select`;
    select.value = value;
    select.addEventListener("change", onChangeHandler);

    options.forEach((optionText) => {
      const option = document.createElement("option");
      option.value = optionText;
      option.innerText = optionText;
      select.appendChild(option);
    });

    selectControl.appendChild(select);
    return selectControl;
  };

  controlDisabledDiv.appendChild(
    createSelectControl(
      "Select Background:",
      "background",
      changeBackgroundFlag,
      ["Day", "Night", "Studio"],
      handleBackgroundChange
    )
  );
  controlDisabledDiv.appendChild(
    createSelectControl(
      "Select Color:",
      "car-color",
      changeCarColorFlag,
      [
        "Fire_Red",
        "Black",
        "Luster_Blue",
        "Magma_Grey",
        "Noevl_Orange",
        "Pearl_Arctic_White",
        "Splendid_Silver",
      ],
      handleCarColorChange
    )
  );
};

const remove360Items = (controlDisabledDiv) => {
  const viewSection = document.getElementById("view-section");
  const microInteraction = document.getElementById("micro-interaction");
  const selectControlBG = document.getElementById("select-control-background");
  const selectControlCarColor = document.getElementById(
    "select-control-car-color"
  );
  controlDisabledDiv.removeChild(viewSection);
  controlDisabledDiv.removeChild(microInteraction);
  controlDisabledDiv.removeChild(selectControlBG);
  controlDisabledDiv.removeChild(selectControlCarColor);
};

const loadAccessoryItems = (controlDisabledDiv) => {
  const selectControl = document.createElement("div");
  selectControl.id = "select-control-accessory";
  selectControl.classList.add("select-control", "list-background");

  const label = document.createElement("label");
  label.htmlFor = "list-select";
  label.innerText = "List:";
  selectControl.appendChild(label);

  const select = document.createElement("select");
  select.id = "list-select";
  select.value = accessoryFlag;
  select.addEventListener("change", handleAccessoryList);
  const noneOption = document.createElement("option");
  noneOption.value = null;
  noneOption.innerText = "None";
  select.appendChild(noneOption);

  Object.keys(ACCESSORY_LIST).forEach((accessory) => {
    const option = document.createElement("option");
    option.value = accessory;
    option.innerText = accessory;
    select.appendChild(option);
  });

  selectControl.appendChild(select);

  controlDisabledDiv.appendChild(selectControl);
};

const removeAccessoryItems = (controlDisabledDiv) => {
  const selectControl = document.getElementById("select-control-accessory");
  controlDisabledDiv.removeChild(selectControl);
};

const loadViewCinematic = (controlPanel) => {
  const cinematicBtn = document.createElement("button");
  cinematicBtn.id = "cinematic-btn";
  cinematicBtn.innerText = "View Cinematic";
  cinematicBtn.addEventListener("click", function () {
    toggleCinematic(controlPanel);
  });
  controlPanel.appendChild(cinematicBtn);
};

const removeViewCinematic = (controlPanel) => {
  const cinematicBtn = document.getElementById("cinematic-btn");
  controlPanel.removeChild(cinematicBtn);
};

const loadExitCinematic = (controlPanel) => {
  const exitCinematicBtn = document.createElement("button");
  exitCinematicBtn.id = "exit-cinematic-btn";
  exitCinematicBtn.innerText = "Exit Cinematic";
  exitCinematicBtn.addEventListener("click", function () {
    exitCinematic(controlPanel);
  });
  controlPanel.appendChild(exitCinematicBtn);
};

const removeExitCinematic = (controlPanel) => {
  const exitCinematicBtn = document.getElementById("exit-cinematic-btn");
  controlPanel.removeChild(exitCinematicBtn);
};

const loadDialogController = () => {
  const app = document.getElementById("app3d");
  const controlPanel = document.createElement("div");
  controlPanel.classList.add("control-panel");
  controlPanel.id = "control-panel";
  if (inProgress) controlPanel.classList.add("control-disabled");

  const controlDisabledDiv = document.createElement("div");
  controlDisabledDiv.id = "control-disabled-div";

  const inspectorSection = document.createElement("div");
  inspectorSection.classList.add("inspector-section");

  const inspectorButtons = document.createElement("div");
  inspectorButtons.classList.add("inspector-buttons");

  const button360 = document.createElement("button");
  button360.type = "button";
  button360.classList.add("view-button", "exterior");
  button360.innerText = "360";
  button360.addEventListener("click", handle360);
  inspectorButtons.appendChild(button360);

  const buttonAccessory = document.createElement("button");
  buttonAccessory.type = "button";
  buttonAccessory.classList.add("view-button", "interior");
  buttonAccessory.innerText = "Accessory";
  buttonAccessory.addEventListener("click", () => handleAccessory());
  inspectorButtons.appendChild(buttonAccessory);

  const buttonExterior = document.createElement("button");
  buttonExterior.type = "button";
  buttonExterior.classList.add("view-button", "exterior");
  buttonExterior.innerText = "Exterior";
  buttonExterior.addEventListener("click", exteriorView);
  inspectorButtons.appendChild(buttonExterior);

  const buttonInterior = document.createElement("button");
  buttonInterior.type = "button";
  buttonInterior.classList.add("view-button", "interior");
  buttonInterior.innerText = "Interior";
  buttonInterior.addEventListener("click", interiorView);
  inspectorButtons.appendChild(buttonInterior);
  inspectorSection.appendChild(inspectorButtons);
  controlDisabledDiv.appendChild(inspectorSection);
  load360Items(controlDisabledDiv);
  controlPanel.appendChild(controlDisabledDiv);
  loadViewCinematic(controlPanel);
  app.appendChild(controlPanel);
};

export default function decorate(block) {
  const pTagArray = block.getElementsByTagName("p");
  loadCSS("./3d-configurator-js.css");
  configuratorLoad(pTagArray);

  const body = document.querySelector("body");
  body.style.overflow = "auto";
  const app = document.createElement("div");
  app.id = "app3d";
  const one3d = document.createElement("div");
  one3d.id = "one3d";
  app.appendChild(one3d);
  document.body.appendChild(app);

  block.appendChild(body);
}
