export default function decorate(block) {
  console.log("inside visualComparison");
  console.log("block check", block);

  const videoData = {
    CarView1: {
      feature1: {
        url1: "/content/dam/auto/english/videos/visual-compare/Artic White.mp4",
        url2: "/content/dam/auto/english/videos/visual-compare/Midnight Black.mp4",
      },
      feature2: {
        url1: "/content/dam/auto/english/videos/visual-compare/Nexa Blue.mp4",
        url2: "/content/dam/auto/english/videos/visual-compare/Opulent Red.mp4",
      },
      feature3: {
        url1: "/content/dam/auto/english/videos/visual-compare/Chestnut Brown.mp4",
        url2: "/content/dam/auto/english/videos/visual-compare/Grandeur Grey.mp4",
      },
    },
    CarView2: {
      feature1: {
        url1: "/content/dam/auto/english/videos/visual-compare/Chestnut Brown.mp4",
        url2: "/content/dam/auto/english/videos/visual-compare/Grandeur Grey.mp4",
      },
      feature2: {
        url1: "/content/dam/auto/english/videos/visual-compare/Midnight Black.mp4",
        url2: "/content/dam/auto/english/videos/visual-compare/Artic White.mp4",
      },
      feature3: {
        url1: "/content/dam/auto/english/videos/visual-compare/Nexa Blue.mp4",
        url2: "/content/dam/auto/english/videos/visual-compare/Opulent Red.mp4",
      },
    },
  };

  const wrapperMainContainer = document.getElementsByClassName("visual-comparison-container")[0];
  const mainDiv = document.createElement("div");
  const videoDiv = document.createElement("div");
  videoDiv.classList.add("video-compare__video-container");
  const innerVideoDiv = document.createElement("div");
  innerVideoDiv.classList.add("video-compare__sync-video-player");
  const innerTabList = document.createElement('div');
  innerTabList.classList.add("video-compare__inner-tab-list");
  const videoUrlList = [];
  const currentUrl = window.location.href;

  const createVideoElement = (urlsData) => {
    var videoTags = innerVideoDiv
      ? innerVideoDiv.querySelectorAll("video")
      : null;
    if (videoTags.length === 0) {
      for (const video in urlsData) {
        const videoContainer = document.createElement("video");
        videoContainer.classList.add("video-compare__video");
        if(currentUrl.includes('samplefranklin.hlx.live') || currentUrl.includes('localhost')){
          videoContainer.src = 'https://publish-p71852-e1137339.adobeaemcloud.com'+urlsData[video];
        }
        else{
          videoContainer.src = urlsData[video];
        }
        videoContainer.loop = true;
        videoContainer.autoplay = true;
        innerVideoDiv.appendChild(videoContainer);

        videoUrlList.push(videoContainer);
      }

      if (videoUrlList.length !== 0) {
        const [video1, video2] = [videoUrlList[0], videoUrlList[1]];
        function syncPlay() {
          if (video1.paused !== video2.paused) {
            if (video1.paused) {
              video2.pause();
            } else {
              video2.play();
            }
          }
        }
        function syncPause() {
          if (video1.paused !== video2.paused) {
            if (video1.paused) {
              video2.pause();
            } else {
              video2.play();
            }
          }
        }
        function syncTimeUpdate() {
          if (Math.abs(video1.currentTime - video2.currentTime) > 0.1) {
            video2.currentTime = video1.currentTime;
          }
        }
        video1.addEventListener("play", syncPlay);
        video1.addEventListener("pause", syncPause);
        video1.addEventListener("timeupdate", syncTimeUpdate);
      }
    } else {
      videoTags.forEach(function (video) {
        innerVideoDiv.removeChild(video);
      });
      createVideoElement(urlsData);
    }
  };

  const createInternalTabElement = (tabsData, parentTab) => {
    mainDiv.classList.add("video-compare");
    var buttons = mainDiv ? mainDiv.querySelectorAll("button") : null;
    if (buttons.length === 0) {
      parentTab.classList.add("active");
      for (const tab in tabsData) {
        const childTab = document.createElement("button");
        childTab.classList.add("video-compare__inner-tab-button");
        childTab.innerHTML = tab;
        childTab.addEventListener("click", () => createVideoElement(tabsData[tab]));
        innerTabList.appendChild(childTab)
        mainDiv.appendChild(innerTabList);
      }
    } else {
      buttons.forEach(function (button) {
        innerTabList.removeChild(button);
      });
      createInternalTabElement(tabsData, parentTab);
    }
  };

  function generateVideoContent(data) {
    const outerTabList = document.createElement('div');
    outerTabList.classList.add('visual-comparison__outer-tab-list');
    for (const tab in data) {
      const parentTab = document.createElement("button");
      parentTab.classList.add("visual-comparison__outer-tab-button");
      parentTab.innerHTML = tab;
      parentTab.addEventListener("click", () => createInternalTabElement(data[tab], parentTab));
      outerTabList.appendChild(parentTab);
      wrapperMainContainer.appendChild(outerTabList);
    }
  }

  generateVideoContent(videoData);

  videoDiv.append(innerVideoDiv);
  mainDiv.append(videoDiv);
  block.textContent = "";
  block.append(mainDiv);
}
