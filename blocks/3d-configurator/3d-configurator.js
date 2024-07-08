import { carConfigurator } from "../../scripts/carConfigurator.js";
// const configuratorLoad = (pTagArray) => {
//   var script = document.createElement("script");
//   // script.src = pTagArray[0].innerText + "one3d/project/" + pTagArray[2].innerText + "/player/one3d_functions.min.js"
//   //   script.src = "../../scripts/carConfigurator";
//   script.type = "text/javascript";
//   document.getElementsByTagName("head")[0].appendChild(script);
// };

export default function decorate(block) {
//   const pTagArray = block.getElementsByTagName("p");
  //   configuratorLoad(pTagArray);
  carConfigurator();

  const body = document.querySelector("body");
  body.style.overflow = "auto";

//   const div = document.createElement("div");
//   div.id = "one3d";
//   div.style.marginTop = "-100px";
//   const h1 = document.createElement("h1");
//   h1.textContent = "3D Configurator";
//   div.appendChild(h1);

//   // Create the p element
//   const p = document.createElement("p");
//   p.textContent = "View";
//   div.appendChild(p);

  // Create the button elements
//   const buttons = ["Exterior", "Interior", "Back Seat", "Front Seat"].map(
//     (text) => {
//       const button = document.createElement("button");
//       button.textContent = text;
//       button.style.fontSize = "15px";
//       button.style.top = "100px";
//       button.style.position = "relative";
//       button.style.background = "transparent";
//       // Add event handler for click event
//       button.addEventListener("click", () => {
//         switch (text) {
//           case "Exterior":
//             ONE3D.exteriorView();
//             break;
//           case "Interior":
//             ONE3D.interiorView();
//             break;
//           case "Back Seat":
//             ONE3D.backseatView();
//             break;
//           case "Front Seat":
//             ONE3D.frontseatView();
//             break;
//           default:
//             break;
//         }
//       });
//       return button;
//     }
//   );
//   buttons.forEach((button) => div.appendChild(button));
  const div1 = document.createElement("div");
  div1.innerHTML=
    '<configurator-element id="config-element" content="eyJjZG51cmwiOiJodHRwczovL2Qza3Y3Zm5qZzllcTU1LmNsb3VkZnJvbnQubmV0L2Fzc2V0cy8iLCJtb2RlbElEIjoic3dpZnQiLCJ2YXJpYW50SUQiOiJaWElfUExVU19BVCIsImNvbG9ySUQiOiJGaXJlX1JlZCIsInZpZGVvVXJsIjoiL2NvbnRlbnQvZGFtL2F1dG8vZW5nbGlzaC92aWRlb3Mvc21hcnQtY3JvcC9UcmFjdGlvbiBDb250cm9sLm1vdiJ9" ></configurator-element>'
  
  body.appendChild(div1);
  block.appendChild(body);
}
