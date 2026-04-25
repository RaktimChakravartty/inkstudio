export interface IconEntry {
  id: string;
  assetNum: string;
  category: string;
  label: string;
  path: string;
}

export interface IconCategory {
  id: string;
  label: string;
  count: number;
}

export const ICON_CATEGORIES: IconCategory[] = [
  {
    "id": "all",
    "label": "All Icons",
    "count": 299
  },
  {
    "id": "social",
    "label": "Social & Users",
    "count": 11
  },
  {
    "id": "business",
    "label": "Business & Data",
    "count": 28
  },
  {
    "id": "media",
    "label": "Media & Sound",
    "count": 31
  },
  {
    "id": "navigation",
    "label": "Arrows & Navigation",
    "count": 37
  },
  {
    "id": "interface",
    "label": "Interface & Controls",
    "count": 39
  },
  {
    "id": "weather",
    "label": "Weather & Nature",
    "count": 30
  },
  {
    "id": "files",
    "label": "Files & Documents",
    "count": 54
  },
  {
    "id": "phone",
    "label": "Phone & Mobile",
    "count": 17
  },
  {
    "id": "shopping",
    "label": "Shopping & Commerce",
    "count": 16
  },
  {
    "id": "design",
    "label": "Design & Creative",
    "count": 36
  }
];

export const ICONS: IconEntry[] = [
  {
    "id": "align-center",
    "assetNum": "88",
    "category": "files",
    "label": "Align Center",
    "path": "/icons/align-center.svg"
  },
  {
    "id": "align-justify",
    "assetNum": "90",
    "category": "files",
    "label": "Align Justify",
    "path": "/icons/align-justify.svg"
  },
  {
    "id": "align-left",
    "assetNum": "87",
    "category": "files",
    "label": "Align Left",
    "path": "/icons/align-left.svg"
  },
  {
    "id": "align-right",
    "assetNum": "89",
    "category": "files",
    "label": "Align Right",
    "path": "/icons/align-right.svg"
  },
  {
    "id": "align-v-bottom",
    "assetNum": "163",
    "category": "design",
    "label": "Align V Bottom",
    "path": "/icons/align-v-bottom.svg"
  },
  {
    "id": "align-v-center",
    "assetNum": "162",
    "category": "design",
    "label": "Align V Center",
    "path": "/icons/align-v-center.svg"
  },
  {
    "id": "align-v-top",
    "assetNum": "161",
    "category": "design",
    "label": "Align V Top",
    "path": "/icons/align-v-top.svg"
  },
  {
    "id": "area-chart",
    "assetNum": "40",
    "category": "business",
    "label": "Area Chart",
    "path": "/icons/area-chart.svg"
  },
  {
    "id": "arrow-bend-left",
    "assetNum": "259",
    "category": "navigation",
    "label": "Arrow Bend Left",
    "path": "/icons/arrow-bend-left.svg"
  },
  {
    "id": "arrow-circle-right",
    "assetNum": "261",
    "category": "navigation",
    "label": "Arrow Circle Right",
    "path": "/icons/arrow-circle-right.svg"
  },
  {
    "id": "arrow-diagonal",
    "assetNum": "265",
    "category": "navigation",
    "label": "Arrow Diagonal",
    "path": "/icons/arrow-diagonal.svg"
  },
  {
    "id": "arrow-down",
    "assetNum": "115",
    "category": "navigation",
    "label": "Arrow Down",
    "path": "/icons/arrow-down.svg"
  },
  {
    "id": "arrow-down-alt",
    "assetNum": "119",
    "category": "navigation",
    "label": "Arrow Down Alt",
    "path": "/icons/arrow-down-alt.svg"
  },
  {
    "id": "arrow-down-box",
    "assetNum": "118",
    "category": "navigation",
    "label": "Arrow Down Box",
    "path": "/icons/arrow-down-box.svg"
  },
  {
    "id": "arrow-down-box-alt",
    "assetNum": "268",
    "category": "navigation",
    "label": "Arrow Down Box Alt",
    "path": "/icons/arrow-down-box-alt.svg"
  },
  {
    "id": "arrow-down-double",
    "assetNum": "270",
    "category": "navigation",
    "label": "Arrow Down Double",
    "path": "/icons/arrow-down-double.svg"
  },
  {
    "id": "arrow-down-left",
    "assetNum": "120",
    "category": "navigation",
    "label": "Arrow Down Left",
    "path": "/icons/arrow-down-left.svg"
  },
  {
    "id": "arrow-down-thin",
    "assetNum": "269",
    "category": "navigation",
    "label": "Arrow Down Thin",
    "path": "/icons/arrow-down-thin.svg"
  },
  {
    "id": "arrow-left-long",
    "assetNum": "258",
    "category": "navigation",
    "label": "Arrow Left Long",
    "path": "/icons/arrow-left-long.svg"
  },
  {
    "id": "arrow-left-long-alt",
    "assetNum": "272",
    "category": "navigation",
    "label": "Arrow Left Long Alt",
    "path": "/icons/arrow-left-long-alt.svg"
  },
  {
    "id": "arrow-left-phone",
    "assetNum": "224",
    "category": "phone",
    "label": "Arrow Left Phone",
    "path": "/icons/arrow-left-phone.svg"
  },
  {
    "id": "arrow-right",
    "assetNum": "114",
    "category": "navigation",
    "label": "Arrow Right",
    "path": "/icons/arrow-right.svg"
  },
  {
    "id": "arrow-right-alt",
    "assetNum": "260",
    "category": "navigation",
    "label": "Arrow Right Alt",
    "path": "/icons/arrow-right-alt.svg"
  },
  {
    "id": "arrow-right-phone",
    "assetNum": "225",
    "category": "phone",
    "label": "Arrow Right Phone",
    "path": "/icons/arrow-right-phone.svg"
  },
  {
    "id": "arrow-right-thin",
    "assetNum": "271",
    "category": "navigation",
    "label": "Arrow Right Thin",
    "path": "/icons/arrow-right-thin.svg"
  },
  {
    "id": "arrow-up",
    "assetNum": "116",
    "category": "navigation",
    "label": "Arrow Up",
    "path": "/icons/arrow-up.svg"
  },
  {
    "id": "arrow-up-alt",
    "assetNum": "117",
    "category": "navigation",
    "label": "Arrow Up Alt",
    "path": "/icons/arrow-up-alt.svg"
  },
  {
    "id": "arrow-up-box",
    "assetNum": "267",
    "category": "navigation",
    "label": "Arrow Up Box",
    "path": "/icons/arrow-up-box.svg"
  },
  {
    "id": "arrow-up-right",
    "assetNum": "113",
    "category": "navigation",
    "label": "Arrow Up Right",
    "path": "/icons/arrow-up-right.svg"
  },
  {
    "id": "arrow-up-right-box",
    "assetNum": "266",
    "category": "navigation",
    "label": "Arrow Up Right Box",
    "path": "/icons/arrow-up-right-box.svg"
  },
  {
    "id": "arrows-burst",
    "assetNum": "264",
    "category": "navigation",
    "label": "Arrows Burst",
    "path": "/icons/arrows-burst.svg"
  },
  {
    "id": "arrows-scatter",
    "assetNum": "263",
    "category": "navigation",
    "label": "Arrows Scatter",
    "path": "/icons/arrows-scatter.svg"
  },
  {
    "id": "arrows-zigzag",
    "assetNum": "121",
    "category": "navigation",
    "label": "Arrows Zigzag",
    "path": "/icons/arrows-zigzag.svg"
  },
  {
    "id": "bar-chart-group",
    "assetNum": "48",
    "category": "business",
    "label": "Bar Chart Group",
    "path": "/icons/bar-chart-group.svg"
  },
  {
    "id": "bar-chart-h",
    "assetNum": "42",
    "category": "business",
    "label": "Bar Chart H",
    "path": "/icons/bar-chart-h.svg"
  },
  {
    "id": "bar-chart-v",
    "assetNum": "47",
    "category": "business",
    "label": "Bar Chart V",
    "path": "/icons/bar-chart-v.svg"
  },
  {
    "id": "battery-charging",
    "assetNum": "171",
    "category": "interface",
    "label": "Battery Charging",
    "path": "/icons/battery-charging.svg"
  },
  {
    "id": "battery-empty",
    "assetNum": "172",
    "category": "interface",
    "label": "Battery Empty",
    "path": "/icons/battery-empty.svg"
  },
  {
    "id": "battery-full",
    "assetNum": "170",
    "category": "interface",
    "label": "Battery Full",
    "path": "/icons/battery-full.svg"
  },
  {
    "id": "battery-half",
    "assetNum": "169",
    "category": "interface",
    "label": "Battery Half",
    "path": "/icons/battery-half.svg"
  },
  {
    "id": "bell",
    "assetNum": "6",
    "category": "navigation",
    "label": "Bell",
    "path": "/icons/bell.svg"
  },
  {
    "id": "bell-alert",
    "assetNum": "152",
    "category": "phone",
    "label": "Bell Alert",
    "path": "/icons/bell-alert.svg"
  },
  {
    "id": "bell-desk",
    "assetNum": "208",
    "category": "weather",
    "label": "Bell Desk",
    "path": "/icons/bell-desk.svg"
  },
  {
    "id": "bell-notification",
    "assetNum": "75",
    "category": "media",
    "label": "Bell Notification",
    "path": "/icons/bell-notification.svg"
  },
  {
    "id": "bell-ring",
    "assetNum": "76",
    "category": "media",
    "label": "Bell Ring",
    "path": "/icons/bell-ring.svg"
  },
  {
    "id": "bell-ring-alt",
    "assetNum": "153",
    "category": "phone",
    "label": "Bell Ring Alt",
    "path": "/icons/bell-ring-alt.svg"
  },
  {
    "id": "bell-slash",
    "assetNum": "154",
    "category": "phone",
    "label": "Bell Slash",
    "path": "/icons/bell-slash.svg"
  },
  {
    "id": "bell-small",
    "assetNum": "143",
    "category": "design",
    "label": "Bell Small",
    "path": "/icons/bell-small.svg"
  },
  {
    "id": "bird-tweet",
    "assetNum": "209",
    "category": "weather",
    "label": "Bird Tweet",
    "path": "/icons/bird-tweet.svg"
  },
  {
    "id": "box-3d",
    "assetNum": "111",
    "category": "design",
    "label": "Box 3d",
    "path": "/icons/box-3d.svg"
  },
  {
    "id": "box-open",
    "assetNum": "112",
    "category": "design",
    "label": "Box Open",
    "path": "/icons/box-open.svg"
  },
  {
    "id": "bracket-left",
    "assetNum": "174",
    "category": "interface",
    "label": "Bracket Left",
    "path": "/icons/bracket-left.svg"
  },
  {
    "id": "bracket-right",
    "assetNum": "175",
    "category": "interface",
    "label": "Bracket Right",
    "path": "/icons/bracket-right.svg"
  },
  {
    "id": "briefcase",
    "assetNum": "36",
    "category": "business",
    "label": "Briefcase",
    "path": "/icons/briefcase.svg"
  },
  {
    "id": "brush-paint",
    "assetNum": "274",
    "category": "shopping",
    "label": "Brush Paint",
    "path": "/icons/brush-paint.svg"
  },
  {
    "id": "calculator",
    "assetNum": "15",
    "category": "business",
    "label": "Calculator",
    "path": "/icons/calculator.svg"
  },
  {
    "id": "calendar",
    "assetNum": "13",
    "category": "business",
    "label": "Calendar",
    "path": "/icons/calendar.svg"
  },
  {
    "id": "candlestick",
    "assetNum": "91",
    "category": "files",
    "label": "Candlestick",
    "path": "/icons/candlestick.svg"
  },
  {
    "id": "candlestick-alt",
    "assetNum": "166",
    "category": "design",
    "label": "Candlestick Alt",
    "path": "/icons/candlestick-alt.svg"
  },
  {
    "id": "cart-add",
    "assetNum": "249",
    "category": "shopping",
    "label": "Cart Add",
    "path": "/icons/cart-add.svg"
  },
  {
    "id": "cart-check",
    "assetNum": "251",
    "category": "shopping",
    "label": "Cart Check",
    "path": "/icons/cart-check.svg"
  },
  {
    "id": "cart-remove",
    "assetNum": "250",
    "category": "shopping",
    "label": "Cart Remove",
    "path": "/icons/cart-remove.svg"
  },
  {
    "id": "cart-x",
    "assetNum": "252",
    "category": "shopping",
    "label": "Cart X",
    "path": "/icons/cart-x.svg"
  },
  {
    "id": "celsius",
    "assetNum": "129",
    "category": "weather",
    "label": "Celsius",
    "path": "/icons/celsius.svg"
  },
  {
    "id": "chain-link",
    "assetNum": "127",
    "category": "weather",
    "label": "Chain Link",
    "path": "/icons/chain-link.svg"
  },
  {
    "id": "chat-bubble",
    "assetNum": "3",
    "category": "social",
    "label": "Chat Bubble",
    "path": "/icons/chat-bubble.svg"
  },
  {
    "id": "check",
    "assetNum": "32",
    "category": "interface",
    "label": "Check",
    "path": "/icons/check.svg"
  },
  {
    "id": "check-circle",
    "assetNum": "246",
    "category": "business",
    "label": "Check Circle",
    "path": "/icons/check-circle.svg"
  },
  {
    "id": "chevron-double-down",
    "assetNum": "254",
    "category": "navigation",
    "label": "Chevron Double Down",
    "path": "/icons/chevron-double-down.svg"
  },
  {
    "id": "chevron-double-left",
    "assetNum": "256",
    "category": "navigation",
    "label": "Chevron Double Left",
    "path": "/icons/chevron-double-left.svg"
  },
  {
    "id": "chevron-double-up",
    "assetNum": "253",
    "category": "navigation",
    "label": "Chevron Double Up",
    "path": "/icons/chevron-double-up.svg"
  },
  {
    "id": "chevron-left",
    "assetNum": "255",
    "category": "navigation",
    "label": "Chevron Left",
    "path": "/icons/chevron-left.svg"
  },
  {
    "id": "circle-slash",
    "assetNum": "299",
    "category": "interface",
    "label": "Circle Slash",
    "path": "/icons/circle-slash.svg"
  },
  {
    "id": "clipboard",
    "assetNum": "28",
    "category": "business",
    "label": "Clipboard",
    "path": "/icons/clipboard.svg"
  },
  {
    "id": "cloud",
    "assetNum": "122",
    "category": "weather",
    "label": "Cloud",
    "path": "/icons/cloud.svg"
  },
  {
    "id": "cloud-alt",
    "assetNum": "123",
    "category": "weather",
    "label": "Cloud Alt",
    "path": "/icons/cloud-alt.svg"
  },
  {
    "id": "cloud-double",
    "assetNum": "124",
    "category": "weather",
    "label": "Cloud Double",
    "path": "/icons/cloud-double.svg"
  },
  {
    "id": "cloud-moon",
    "assetNum": "138",
    "category": "weather",
    "label": "Cloud Moon",
    "path": "/icons/cloud-moon.svg"
  },
  {
    "id": "cloud-rain",
    "assetNum": "198",
    "category": "weather",
    "label": "Cloud Rain",
    "path": "/icons/cloud-rain.svg"
  },
  {
    "id": "cloud-snow",
    "assetNum": "199",
    "category": "weather",
    "label": "Cloud Snow",
    "path": "/icons/cloud-snow.svg"
  },
  {
    "id": "cloud-sun",
    "assetNum": "197",
    "category": "weather",
    "label": "Cloud Sun",
    "path": "/icons/cloud-sun.svg"
  },
  {
    "id": "cloud-wind",
    "assetNum": "200",
    "category": "weather",
    "label": "Cloud Wind",
    "path": "/icons/cloud-wind.svg"
  },
  {
    "id": "code-angle",
    "assetNum": "236",
    "category": "shopping",
    "label": "Code Angle",
    "path": "/icons/code-angle.svg"
  },
  {
    "id": "code-brackets",
    "assetNum": "234",
    "category": "files",
    "label": "Code Brackets",
    "path": "/icons/code-brackets.svg"
  },
  {
    "id": "code-html",
    "assetNum": "235",
    "category": "design",
    "label": "Code Html",
    "path": "/icons/code-html.svg"
  },
  {
    "id": "comment",
    "assetNum": "17",
    "category": "social",
    "label": "Comment",
    "path": "/icons/comment.svg"
  },
  {
    "id": "compass-east",
    "assetNum": "134",
    "category": "weather",
    "label": "Compass East",
    "path": "/icons/compass-east.svg"
  },
  {
    "id": "compass-electro",
    "assetNum": "136",
    "category": "weather",
    "label": "Compass Electro",
    "path": "/icons/compass-electro.svg"
  },
  {
    "id": "compass-ne",
    "assetNum": "135",
    "category": "weather",
    "label": "Compass Ne",
    "path": "/icons/compass-ne.svg"
  },
  {
    "id": "compass-north",
    "assetNum": "132",
    "category": "weather",
    "label": "Compass North",
    "path": "/icons/compass-north.svg"
  },
  {
    "id": "compass-south",
    "assetNum": "133",
    "category": "weather",
    "label": "Compass South",
    "path": "/icons/compass-south.svg"
  },
  {
    "id": "copy-duplicate",
    "assetNum": "85",
    "category": "files",
    "label": "Copy Duplicate",
    "path": "/icons/copy-duplicate.svg"
  },
  {
    "id": "crop-frame",
    "assetNum": "182",
    "category": "interface",
    "label": "Crop Frame",
    "path": "/icons/crop-frame.svg"
  },
  {
    "id": "cursor",
    "assetNum": "257",
    "category": "navigation",
    "label": "Cursor",
    "path": "/icons/cursor.svg"
  },
  {
    "id": "desktop-share",
    "assetNum": "100",
    "category": "files",
    "label": "Desktop Share",
    "path": "/icons/desktop-share.svg"
  },
  {
    "id": "diamond-gem",
    "assetNum": "128",
    "category": "weather",
    "label": "Diamond Gem",
    "path": "/icons/diamond-gem.svg"
  },
  {
    "id": "disc-cd",
    "assetNum": "63",
    "category": "media",
    "label": "Disc Cd",
    "path": "/icons/disc-cd.svg"
  },
  {
    "id": "disc-vinyl",
    "assetNum": "62",
    "category": "media",
    "label": "Disc Vinyl",
    "path": "/icons/disc-vinyl.svg"
  },
  {
    "id": "distribute-h",
    "assetNum": "164",
    "category": "design",
    "label": "Distribute H",
    "path": "/icons/distribute-h.svg"
  },
  {
    "id": "distribute-v",
    "assetNum": "165",
    "category": "design",
    "label": "Distribute V",
    "path": "/icons/distribute-v.svg"
  },
  {
    "id": "divider-line",
    "assetNum": "192",
    "category": "design",
    "label": "Divider Line",
    "path": "/icons/divider-line.svg"
  },
  {
    "id": "document",
    "assetNum": "9",
    "category": "files",
    "label": "Document",
    "path": "/icons/document.svg"
  },
  {
    "id": "document-fold",
    "assetNum": "31",
    "category": "interface",
    "label": "Document Fold",
    "path": "/icons/document-fold.svg"
  },
  {
    "id": "donut-chart",
    "assetNum": "50",
    "category": "business",
    "label": "Donut Chart",
    "path": "/icons/donut-chart.svg"
  },
  {
    "id": "download",
    "assetNum": "21",
    "category": "navigation",
    "label": "Download",
    "path": "/icons/download.svg"
  },
  {
    "id": "download-arrow",
    "assetNum": "213",
    "category": "phone",
    "label": "Download Arrow",
    "path": "/icons/download-arrow.svg"
  },
  {
    "id": "download-box",
    "assetNum": "215",
    "category": "phone",
    "label": "Download Box",
    "path": "/icons/download-box.svg"
  },
  {
    "id": "download-cloud",
    "assetNum": "214",
    "category": "phone",
    "label": "Download Cloud",
    "path": "/icons/download-cloud.svg"
  },
  {
    "id": "envelope-alt",
    "assetNum": "98",
    "category": "files",
    "label": "Envelope Alt",
    "path": "/icons/envelope-alt.svg"
  },
  {
    "id": "envelope-check",
    "assetNum": "18",
    "category": "social",
    "label": "Envelope Check",
    "path": "/icons/envelope-check.svg"
  },
  {
    "id": "envelope-check-alt",
    "assetNum": "233",
    "category": "files",
    "label": "Envelope Check Alt",
    "path": "/icons/envelope-check-alt.svg"
  },
  {
    "id": "envelope-circle",
    "assetNum": "229",
    "category": "files",
    "label": "Envelope Circle",
    "path": "/icons/envelope-circle.svg"
  },
  {
    "id": "envelope-heart",
    "assetNum": "231",
    "category": "files",
    "label": "Envelope Heart",
    "path": "/icons/envelope-heart.svg"
  },
  {
    "id": "envelope-lock",
    "assetNum": "232",
    "category": "files",
    "label": "Envelope Lock",
    "path": "/icons/envelope-lock.svg"
  },
  {
    "id": "envelope-open",
    "assetNum": "8",
    "category": "files",
    "label": "Envelope Open",
    "path": "/icons/envelope-open.svg"
  },
  {
    "id": "envelope-open-alt",
    "assetNum": "228",
    "category": "files",
    "label": "Envelope Open Alt",
    "path": "/icons/envelope-open-alt.svg"
  },
  {
    "id": "envelope-plain",
    "assetNum": "227",
    "category": "files",
    "label": "Envelope Plain",
    "path": "/icons/envelope-plain.svg"
  },
  {
    "id": "envelope-x",
    "assetNum": "230",
    "category": "files",
    "label": "Envelope X",
    "path": "/icons/envelope-x.svg"
  },
  {
    "id": "equalizer",
    "assetNum": "58",
    "category": "media",
    "label": "Equalizer",
    "path": "/icons/equalizer.svg"
  },
  {
    "id": "fahrenheit",
    "assetNum": "131",
    "category": "weather",
    "label": "Fahrenheit",
    "path": "/icons/fahrenheit.svg"
  },
  {
    "id": "fast-forward",
    "assetNum": "94",
    "category": "files",
    "label": "Fast Forward",
    "path": "/icons/fast-forward.svg"
  },
  {
    "id": "file-copy",
    "assetNum": "288",
    "category": "files",
    "label": "File Copy",
    "path": "/icons/file-copy.svg"
  },
  {
    "id": "file-plus",
    "assetNum": "287",
    "category": "files",
    "label": "File Plus",
    "path": "/icons/file-plus.svg"
  },
  {
    "id": "file-text",
    "assetNum": "289",
    "category": "files",
    "label": "File Text",
    "path": "/icons/file-text.svg"
  },
  {
    "id": "flag",
    "assetNum": "7",
    "category": "navigation",
    "label": "Flag",
    "path": "/icons/flag.svg"
  },
  {
    "id": "flip-horizontal",
    "assetNum": "167",
    "category": "design",
    "label": "Flip Horizontal",
    "path": "/icons/flip-horizontal.svg"
  },
  {
    "id": "flip-vertical",
    "assetNum": "168",
    "category": "design",
    "label": "Flip Vertical",
    "path": "/icons/flip-vertical.svg"
  },
  {
    "id": "folder-open-alt",
    "assetNum": "291",
    "category": "files",
    "label": "Folder Open Alt",
    "path": "/icons/folder-open-alt.svg"
  },
  {
    "id": "folder-outline",
    "assetNum": "290",
    "category": "files",
    "label": "Folder Outline",
    "path": "/icons/folder-outline.svg"
  },
  {
    "id": "fork-knife",
    "assetNum": "191",
    "category": "design",
    "label": "Fork Knife",
    "path": "/icons/fork-knife.svg"
  },
  {
    "id": "forward-fill",
    "assetNum": "55",
    "category": "media",
    "label": "Forward Fill",
    "path": "/icons/forward-fill.svg"
  },
  {
    "id": "gear",
    "assetNum": "11",
    "category": "business",
    "label": "Gear",
    "path": "/icons/gear.svg"
  },
  {
    "id": "gear-cog-alt",
    "assetNum": "286",
    "category": "interface",
    "label": "Gear Cog Alt",
    "path": "/icons/gear-cog-alt.svg"
  },
  {
    "id": "globe",
    "assetNum": "14",
    "category": "business",
    "label": "Globe",
    "path": "/icons/globe.svg"
  },
  {
    "id": "grid-controls",
    "assetNum": "16",
    "category": "interface",
    "label": "Grid Controls",
    "path": "/icons/grid-controls.svg"
  },
  {
    "id": "grid-layout",
    "assetNum": "37",
    "category": "business",
    "label": "Grid Layout",
    "path": "/icons/grid-layout.svg"
  },
  {
    "id": "hamburger-menu",
    "assetNum": "296",
    "category": "interface",
    "label": "Hamburger Menu",
    "path": "/icons/hamburger-menu.svg"
  },
  {
    "id": "headphones",
    "assetNum": "60",
    "category": "media",
    "label": "Headphones",
    "path": "/icons/headphones.svg"
  },
  {
    "id": "headphones-alt",
    "assetNum": "139",
    "category": "media",
    "label": "Headphones Alt",
    "path": "/icons/headphones-alt.svg"
  },
  {
    "id": "heart",
    "assetNum": "210",
    "category": "social",
    "label": "Heart",
    "path": "/icons/heart.svg"
  },
  {
    "id": "heart-bag",
    "assetNum": "211",
    "category": "social",
    "label": "Heart Bag",
    "path": "/icons/heart-bag.svg"
  },
  {
    "id": "home",
    "assetNum": "19",
    "category": "navigation",
    "label": "Home",
    "path": "/icons/home.svg"
  },
  {
    "id": "home-alt",
    "assetNum": "292",
    "category": "files",
    "label": "Home Alt",
    "path": "/icons/home-alt.svg"
  },
  {
    "id": "layers-alt",
    "assetNum": "184",
    "category": "interface",
    "label": "Layers Alt",
    "path": "/icons/layers-alt.svg"
  },
  {
    "id": "layers-stack",
    "assetNum": "183",
    "category": "interface",
    "label": "Layers Stack",
    "path": "/icons/layers-stack.svg"
  },
  {
    "id": "layout-asymmetric",
    "assetNum": "83",
    "category": "files",
    "label": "Layout Asymmetric",
    "path": "/icons/layout-asymmetric.svg"
  },
  {
    "id": "layout-card",
    "assetNum": "159",
    "category": "design",
    "label": "Layout Card",
    "path": "/icons/layout-card.svg"
  },
  {
    "id": "layout-columns-3",
    "assetNum": "78",
    "category": "files",
    "label": "Layout Columns 3",
    "path": "/icons/layout-columns-3.svg"
  },
  {
    "id": "layout-footer",
    "assetNum": "84",
    "category": "files",
    "label": "Layout Footer",
    "path": "/icons/layout-footer.svg"
  },
  {
    "id": "layout-full",
    "assetNum": "81",
    "category": "files",
    "label": "Layout Full",
    "path": "/icons/layout-full.svg"
  },
  {
    "id": "layout-grid-4",
    "assetNum": "77",
    "category": "files",
    "label": "Layout Grid 4",
    "path": "/icons/layout-grid-4.svg"
  },
  {
    "id": "layout-rows",
    "assetNum": "80",
    "category": "files",
    "label": "Layout Rows",
    "path": "/icons/layout-rows.svg"
  },
  {
    "id": "layout-sidebar",
    "assetNum": "79",
    "category": "files",
    "label": "Layout Sidebar",
    "path": "/icons/layout-sidebar.svg"
  },
  {
    "id": "layout-split",
    "assetNum": "82",
    "category": "files",
    "label": "Layout Split",
    "path": "/icons/layout-split.svg"
  },
  {
    "id": "layout-tiles",
    "assetNum": "160",
    "category": "design",
    "label": "Layout Tiles",
    "path": "/icons/layout-tiles.svg"
  },
  {
    "id": "lightning-bolt",
    "assetNum": "126",
    "category": "weather",
    "label": "Lightning Bolt",
    "path": "/icons/lightning-bolt.svg"
  },
  {
    "id": "line-break",
    "assetNum": "297",
    "category": "interface",
    "label": "Line Break",
    "path": "/icons/line-break.svg"
  },
  {
    "id": "line-chart",
    "assetNum": "41",
    "category": "business",
    "label": "Line Chart",
    "path": "/icons/line-chart.svg"
  },
  {
    "id": "link-chain",
    "assetNum": "177",
    "category": "interface",
    "label": "Link Chain",
    "path": "/icons/link-chain.svg"
  },
  {
    "id": "list-bullet",
    "assetNum": "284",
    "category": "files",
    "label": "List Bullet",
    "path": "/icons/list-bullet.svg"
  },
  {
    "id": "list-columns",
    "assetNum": "29",
    "category": "interface",
    "label": "List Columns",
    "path": "/icons/list-columns.svg"
  },
  {
    "id": "list-format",
    "assetNum": "282",
    "category": "files",
    "label": "List Format",
    "path": "/icons/list-format.svg"
  },
  {
    "id": "list-lines",
    "assetNum": "283",
    "category": "files",
    "label": "List Lines",
    "path": "/icons/list-lines.svg"
  },
  {
    "id": "list-rows",
    "assetNum": "30",
    "category": "interface",
    "label": "List Rows",
    "path": "/icons/list-rows.svg"
  },
  {
    "id": "lock-open",
    "assetNum": "242",
    "category": "shopping",
    "label": "Lock Open",
    "path": "/icons/lock-open.svg"
  },
  {
    "id": "magnifier",
    "assetNum": "278",
    "category": "shopping",
    "label": "Magnifier",
    "path": "/icons/magnifier.svg"
  },
  {
    "id": "maximize",
    "assetNum": "180",
    "category": "interface",
    "label": "Maximize",
    "path": "/icons/maximize.svg"
  },
  {
    "id": "megaphone",
    "assetNum": "73",
    "category": "media",
    "label": "Megaphone",
    "path": "/icons/megaphone.svg"
  },
  {
    "id": "megaphone-alt",
    "assetNum": "74",
    "category": "media",
    "label": "Megaphone Alt",
    "path": "/icons/megaphone-alt.svg"
  },
  {
    "id": "menu-lines",
    "assetNum": "294",
    "category": "files",
    "label": "Menu Lines",
    "path": "/icons/menu-lines.svg"
  },
  {
    "id": "mic-off",
    "assetNum": "68",
    "category": "media",
    "label": "Mic Off",
    "path": "/icons/mic-off.svg"
  },
  {
    "id": "mic-podcast",
    "assetNum": "144",
    "category": "design",
    "label": "Mic Podcast",
    "path": "/icons/mic-podcast.svg"
  },
  {
    "id": "microphone",
    "assetNum": "67",
    "category": "media",
    "label": "Microphone",
    "path": "/icons/microphone.svg"
  },
  {
    "id": "microphone-stand",
    "assetNum": "142",
    "category": "media",
    "label": "Microphone Stand",
    "path": "/icons/microphone-stand.svg"
  },
  {
    "id": "minimize",
    "assetNum": "181",
    "category": "interface",
    "label": "Minimize",
    "path": "/icons/minimize.svg"
  },
  {
    "id": "minus",
    "assetNum": "34",
    "category": "interface",
    "label": "Minus",
    "path": "/icons/minus.svg"
  },
  {
    "id": "minus-alt",
    "assetNum": "241",
    "category": "interface",
    "label": "Minus Alt",
    "path": "/icons/minus-alt.svg"
  },
  {
    "id": "minus-circle",
    "assetNum": "247",
    "category": "business",
    "label": "Minus Circle",
    "path": "/icons/minus-circle.svg"
  },
  {
    "id": "monitor",
    "assetNum": "22",
    "category": "business",
    "label": "Monitor",
    "path": "/icons/monitor.svg"
  },
  {
    "id": "monitor-alt",
    "assetNum": "99",
    "category": "files",
    "label": "Monitor Alt",
    "path": "/icons/monitor-alt.svg"
  },
  {
    "id": "monitor-play",
    "assetNum": "176",
    "category": "design",
    "label": "Monitor Play",
    "path": "/icons/monitor-play.svg"
  },
  {
    "id": "moon-cloud",
    "assetNum": "205",
    "category": "weather",
    "label": "Moon Cloud",
    "path": "/icons/moon-cloud.svg"
  },
  {
    "id": "moon-crescent",
    "assetNum": "137",
    "category": "weather",
    "label": "Moon Crescent",
    "path": "/icons/moon-crescent.svg"
  },
  {
    "id": "moon-half",
    "assetNum": "202",
    "category": "weather",
    "label": "Moon Half",
    "path": "/icons/moon-half.svg"
  },
  {
    "id": "move-arrows",
    "assetNum": "226",
    "category": "phone",
    "label": "Move Arrows",
    "path": "/icons/move-arrows.svg"
  },
  {
    "id": "music-cloud",
    "assetNum": "64",
    "category": "media",
    "label": "Music Cloud",
    "path": "/icons/music-cloud.svg"
  },
  {
    "id": "music-note-alt",
    "assetNum": "65",
    "category": "media",
    "label": "Music Note Alt",
    "path": "/icons/music-note-alt.svg"
  },
  {
    "id": "music-note-beamed",
    "assetNum": "140",
    "category": "media",
    "label": "Music Note Beamed",
    "path": "/icons/music-note-beamed.svg"
  },
  {
    "id": "music-note-double",
    "assetNum": "61",
    "category": "media",
    "label": "Music Note Double",
    "path": "/icons/music-note-double.svg"
  },
  {
    "id": "music-note-single",
    "assetNum": "59",
    "category": "media",
    "label": "Music Note Single",
    "path": "/icons/music-note-single.svg"
  },
  {
    "id": "music-playlist",
    "assetNum": "66",
    "category": "media",
    "label": "Music Playlist",
    "path": "/icons/music-playlist.svg"
  },
  {
    "id": "music-wave",
    "assetNum": "141",
    "category": "media",
    "label": "Music Wave",
    "path": "/icons/music-wave.svg"
  },
  {
    "id": "node-editor",
    "assetNum": "189",
    "category": "design",
    "label": "Node Editor",
    "path": "/icons/node-editor.svg"
  },
  {
    "id": "org-chart",
    "assetNum": "245",
    "category": "business",
    "label": "Org Chart",
    "path": "/icons/org-chart.svg"
  },
  {
    "id": "paint-roller",
    "assetNum": "103",
    "category": "files",
    "label": "Paint Roller",
    "path": "/icons/paint-roller.svg"
  },
  {
    "id": "paste",
    "assetNum": "185",
    "category": "design",
    "label": "Paste",
    "path": "/icons/paste.svg"
  },
  {
    "id": "pause-button",
    "assetNum": "52",
    "category": "media",
    "label": "Pause Button",
    "path": "/icons/pause-button.svg"
  },
  {
    "id": "pause-fill",
    "assetNum": "54",
    "category": "media",
    "label": "Pause Fill",
    "path": "/icons/pause-fill.svg"
  },
  {
    "id": "pen-nib",
    "assetNum": "190",
    "category": "design",
    "label": "Pen Nib",
    "path": "/icons/pen-nib.svg"
  },
  {
    "id": "pen-tool",
    "assetNum": "273",
    "category": "shopping",
    "label": "Pen Tool",
    "path": "/icons/pen-tool.svg"
  },
  {
    "id": "phone-incoming",
    "assetNum": "149",
    "category": "phone",
    "label": "Phone Incoming",
    "path": "/icons/phone-incoming.svg"
  },
  {
    "id": "phone-landscape",
    "assetNum": "218",
    "category": "phone",
    "label": "Phone Landscape",
    "path": "/icons/phone-landscape.svg"
  },
  {
    "id": "phone-outgoing",
    "assetNum": "150",
    "category": "phone",
    "label": "Phone Outgoing",
    "path": "/icons/phone-outgoing.svg"
  },
  {
    "id": "phone-portrait",
    "assetNum": "217",
    "category": "phone",
    "label": "Phone Portrait",
    "path": "/icons/phone-portrait.svg"
  },
  {
    "id": "phone-rotate",
    "assetNum": "219",
    "category": "phone",
    "label": "Phone Rotate",
    "path": "/icons/phone-rotate.svg"
  },
  {
    "id": "phone-tilt",
    "assetNum": "220",
    "category": "phone",
    "label": "Phone Tilt",
    "path": "/icons/phone-tilt.svg"
  },
  {
    "id": "phone-vibrate",
    "assetNum": "148",
    "category": "phone",
    "label": "Phone Vibrate",
    "path": "/icons/phone-vibrate.svg"
  },
  {
    "id": "pie-chart",
    "assetNum": "49",
    "category": "business",
    "label": "Pie Chart",
    "path": "/icons/pie-chart.svg"
  },
  {
    "id": "play-button",
    "assetNum": "51",
    "category": "media",
    "label": "Play Button",
    "path": "/icons/play-button.svg"
  },
  {
    "id": "play-circle",
    "assetNum": "4",
    "category": "media",
    "label": "Play Circle",
    "path": "/icons/play-circle.svg"
  },
  {
    "id": "play-fill",
    "assetNum": "53",
    "category": "media",
    "label": "Play Fill",
    "path": "/icons/play-fill.svg"
  },
  {
    "id": "play-skip",
    "assetNum": "92",
    "category": "files",
    "label": "Play Skip",
    "path": "/icons/play-skip.svg"
  },
  {
    "id": "playlist",
    "assetNum": "97",
    "category": "files",
    "label": "Playlist",
    "path": "/icons/playlist.svg"
  },
  {
    "id": "plus",
    "assetNum": "35",
    "category": "interface",
    "label": "Plus",
    "path": "/icons/plus.svg"
  },
  {
    "id": "plus-circle",
    "assetNum": "248",
    "category": "business",
    "label": "Plus Circle",
    "path": "/icons/plus-circle.svg"
  },
  {
    "id": "plus-circle-alt",
    "assetNum": "301",
    "category": "interface",
    "label": "Plus Circle Alt",
    "path": "/icons/plus-circle-alt.svg"
  },
  {
    "id": "pulse",
    "assetNum": "45",
    "category": "business",
    "label": "Pulse",
    "path": "/icons/pulse.svg"
  },
  {
    "id": "qr-code",
    "assetNum": "237",
    "category": "shopping",
    "label": "Qr Code",
    "path": "/icons/qr-code.svg"
  },
  {
    "id": "rainbow",
    "assetNum": "206",
    "category": "weather",
    "label": "Rainbow",
    "path": "/icons/rainbow.svg"
  },
  {
    "id": "raindrop",
    "assetNum": "201",
    "category": "weather",
    "label": "Raindrop",
    "path": "/icons/raindrop.svg"
  },
  {
    "id": "refresh",
    "assetNum": "104",
    "category": "files",
    "label": "Refresh",
    "path": "/icons/refresh.svg"
  },
  {
    "id": "refresh-arrow",
    "assetNum": "179",
    "category": "interface",
    "label": "Refresh Arrow",
    "path": "/icons/refresh-arrow.svg"
  },
  {
    "id": "rewind",
    "assetNum": "93",
    "category": "files",
    "label": "Rewind",
    "path": "/icons/rewind.svg"
  },
  {
    "id": "rocket-launch",
    "assetNum": "276",
    "category": "shopping",
    "label": "Rocket Launch",
    "path": "/icons/rocket-launch.svg"
  },
  {
    "id": "rotate-ccw",
    "assetNum": "106",
    "category": "files",
    "label": "Rotate Ccw",
    "path": "/icons/rotate-ccw.svg"
  },
  {
    "id": "rotate-cw",
    "assetNum": "105",
    "category": "files",
    "label": "Rotate Cw",
    "path": "/icons/rotate-cw.svg"
  },
  {
    "id": "ruler",
    "assetNum": "275",
    "category": "shopping",
    "label": "Ruler",
    "path": "/icons/ruler.svg"
  },
  {
    "id": "scatter-dots",
    "assetNum": "43",
    "category": "business",
    "label": "Scatter Dots",
    "path": "/icons/scatter-dots.svg"
  },
  {
    "id": "scissors",
    "assetNum": "102",
    "category": "files",
    "label": "Scissors",
    "path": "/icons/scissors.svg"
  },
  {
    "id": "search",
    "assetNum": "107",
    "category": "interface",
    "label": "Search",
    "path": "/icons/search.svg"
  },
  {
    "id": "search-alt",
    "assetNum": "277",
    "category": "interface",
    "label": "Search Alt",
    "path": "/icons/search-alt.svg"
  },
  {
    "id": "search-zoom",
    "assetNum": "223",
    "category": "design",
    "label": "Search Zoom",
    "path": "/icons/search-zoom.svg"
  },
  {
    "id": "selection",
    "assetNum": "186",
    "category": "design",
    "label": "Selection",
    "path": "/icons/selection.svg"
  },
  {
    "id": "serve-dome",
    "assetNum": "207",
    "category": "weather",
    "label": "Serve Dome",
    "path": "/icons/serve-dome.svg"
  },
  {
    "id": "settings-gear-alt",
    "assetNum": "285",
    "category": "interface",
    "label": "Settings Gear Alt",
    "path": "/icons/settings-gear-alt.svg"
  },
  {
    "id": "shape-circle",
    "assetNum": "188",
    "category": "design",
    "label": "Shape Circle",
    "path": "/icons/shape-circle.svg"
  },
  {
    "id": "shape-square",
    "assetNum": "187",
    "category": "design",
    "label": "Shape Square",
    "path": "/icons/shape-square.svg"
  },
  {
    "id": "share-network",
    "assetNum": "23",
    "category": "business",
    "label": "Share Network",
    "path": "/icons/share-network.svg"
  },
  {
    "id": "signal-bars",
    "assetNum": "173",
    "category": "interface",
    "label": "Signal Bars",
    "path": "/icons/signal-bars.svg"
  },
  {
    "id": "sitemap",
    "assetNum": "238",
    "category": "shopping",
    "label": "Sitemap",
    "path": "/icons/sitemap.svg"
  },
  {
    "id": "skip-back",
    "assetNum": "95",
    "category": "files",
    "label": "Skip Back",
    "path": "/icons/skip-back.svg"
  },
  {
    "id": "skip-forward",
    "assetNum": "96",
    "category": "files",
    "label": "Skip Forward",
    "path": "/icons/skip-forward.svg"
  },
  {
    "id": "slash",
    "assetNum": "298",
    "category": "interface",
    "label": "Slash",
    "path": "/icons/slash.svg"
  },
  {
    "id": "sort-down",
    "assetNum": "155",
    "category": "navigation",
    "label": "Sort Down",
    "path": "/icons/sort-down.svg"
  },
  {
    "id": "sort-horizontal",
    "assetNum": "158",
    "category": "design",
    "label": "Sort Horizontal",
    "path": "/icons/sort-horizontal.svg"
  },
  {
    "id": "sort-up",
    "assetNum": "156",
    "category": "navigation",
    "label": "Sort Up",
    "path": "/icons/sort-up.svg"
  },
  {
    "id": "sort-vertical",
    "assetNum": "157",
    "category": "design",
    "label": "Sort Vertical",
    "path": "/icons/sort-vertical.svg"
  },
  {
    "id": "spacing-decrease",
    "assetNum": "194",
    "category": "design",
    "label": "Spacing Decrease",
    "path": "/icons/spacing-decrease.svg"
  },
  {
    "id": "spacing-increase",
    "assetNum": "193",
    "category": "design",
    "label": "Spacing Increase",
    "path": "/icons/spacing-increase.svg"
  },
  {
    "id": "sparkle",
    "assetNum": "5",
    "category": "navigation",
    "label": "Sparkle",
    "path": "/icons/sparkle.svg"
  },
  {
    "id": "speaker",
    "assetNum": "69",
    "category": "media",
    "label": "Speaker",
    "path": "/icons/speaker.svg"
  },
  {
    "id": "speaker-fill",
    "assetNum": "146",
    "category": "design",
    "label": "Speaker Fill",
    "path": "/icons/speaker-fill.svg"
  },
  {
    "id": "speaker-mute",
    "assetNum": "70",
    "category": "media",
    "label": "Speaker Mute",
    "path": "/icons/speaker-mute.svg"
  },
  {
    "id": "speaker-mute-fill",
    "assetNum": "147",
    "category": "design",
    "label": "Speaker Mute Fill",
    "path": "/icons/speaker-mute-fill.svg"
  },
  {
    "id": "speaker-wireless",
    "assetNum": "145",
    "category": "design",
    "label": "Speaker Wireless",
    "path": "/icons/speaker-wireless.svg"
  },
  {
    "id": "speaker-x",
    "assetNum": "71",
    "category": "media",
    "label": "Speaker X",
    "path": "/icons/speaker-x.svg"
  },
  {
    "id": "stack-layers",
    "assetNum": "86",
    "category": "files",
    "label": "Stack Layers",
    "path": "/icons/stack-layers.svg"
  },
  {
    "id": "star-badge",
    "assetNum": "221",
    "category": "social",
    "label": "Star Badge",
    "path": "/icons/star-badge.svg"
  },
  {
    "id": "star-fill",
    "assetNum": "12",
    "category": "business",
    "label": "Star Fill",
    "path": "/icons/star-fill.svg"
  },
  {
    "id": "star-outline",
    "assetNum": "10",
    "category": "business",
    "label": "Star Outline",
    "path": "/icons/star-outline.svg"
  },
  {
    "id": "star-outline-alt",
    "assetNum": "293",
    "category": "files",
    "label": "Star Outline Alt",
    "path": "/icons/star-outline-alt.svg"
  },
  {
    "id": "star-sparkle",
    "assetNum": "222",
    "category": "design",
    "label": "Star Sparkle",
    "path": "/icons/star-sparkle.svg"
  },
  {
    "id": "sun",
    "assetNum": "125",
    "category": "weather",
    "label": "Sun",
    "path": "/icons/sun.svg"
  },
  {
    "id": "sun-rays",
    "assetNum": "262",
    "category": "navigation",
    "label": "Sun Rays",
    "path": "/icons/sun-rays.svg"
  },
  {
    "id": "sunrise",
    "assetNum": "203",
    "category": "weather",
    "label": "Sunrise",
    "path": "/icons/sunrise.svg"
  },
  {
    "id": "table-grid",
    "assetNum": "281",
    "category": "files",
    "label": "Table Grid",
    "path": "/icons/table-grid.svg"
  },
  {
    "id": "tag-label",
    "assetNum": "212",
    "category": "design",
    "label": "Tag Label",
    "path": "/icons/tag-label.svg"
  },
  {
    "id": "tag-price",
    "assetNum": "279",
    "category": "shopping",
    "label": "Tag Price",
    "path": "/icons/tag-price.svg"
  },
  {
    "id": "text-format",
    "assetNum": "280",
    "category": "files",
    "label": "Text Format",
    "path": "/icons/text-format.svg"
  },
  {
    "id": "thermometer",
    "assetNum": "130",
    "category": "weather",
    "label": "Thermometer",
    "path": "/icons/thermometer.svg"
  },
  {
    "id": "three-dots",
    "assetNum": "109",
    "category": "interface",
    "label": "Three Dots",
    "path": "/icons/three-dots.svg"
  },
  {
    "id": "timer-clock",
    "assetNum": "243",
    "category": "shopping",
    "label": "Timer Clock",
    "path": "/icons/timer-clock.svg"
  },
  {
    "id": "toggle-off",
    "assetNum": "178",
    "category": "interface",
    "label": "Toggle Off",
    "path": "/icons/toggle-off.svg"
  },
  {
    "id": "transform-add",
    "assetNum": "195",
    "category": "design",
    "label": "Transform Add",
    "path": "/icons/transform-add.svg"
  },
  {
    "id": "transform-remove",
    "assetNum": "196",
    "category": "design",
    "label": "Transform Remove",
    "path": "/icons/transform-remove.svg"
  },
  {
    "id": "trending-break",
    "assetNum": "101",
    "category": "files",
    "label": "Trending Break",
    "path": "/icons/trending-break.svg"
  },
  {
    "id": "trending-down",
    "assetNum": "39",
    "category": "business",
    "label": "Trending Down",
    "path": "/icons/trending-down.svg"
  },
  {
    "id": "trending-up",
    "assetNum": "38",
    "category": "business",
    "label": "Trending Up",
    "path": "/icons/trending-up.svg"
  },
  {
    "id": "trending-zigzag",
    "assetNum": "46",
    "category": "business",
    "label": "Trending Zigzag",
    "path": "/icons/trending-zigzag.svg"
  },
  {
    "id": "umbrella",
    "assetNum": "204",
    "category": "weather",
    "label": "Umbrella",
    "path": "/icons/umbrella.svg"
  },
  {
    "id": "upload-arrow",
    "assetNum": "295",
    "category": "files",
    "label": "Upload Arrow",
    "path": "/icons/upload-arrow.svg"
  },
  {
    "id": "upload-cloud",
    "assetNum": "216",
    "category": "phone",
    "label": "Upload Cloud",
    "path": "/icons/upload-cloud.svg"
  },
  {
    "id": "usb",
    "assetNum": "108",
    "category": "interface",
    "label": "Usb",
    "path": "/icons/usb.svg"
  },
  {
    "id": "user-card",
    "assetNum": "26",
    "category": "social",
    "label": "User Card",
    "path": "/icons/user-card.svg"
  },
  {
    "id": "user-circle",
    "assetNum": "24",
    "category": "social",
    "label": "User Circle",
    "path": "/icons/user-circle.svg"
  },
  {
    "id": "user-group",
    "assetNum": "2",
    "category": "social",
    "label": "User Group",
    "path": "/icons/user-group.svg"
  },
  {
    "id": "user-search",
    "assetNum": "27",
    "category": "social",
    "label": "User Search",
    "path": "/icons/user-search.svg"
  },
  {
    "id": "user-settings",
    "assetNum": "25",
    "category": "social",
    "label": "User Settings",
    "path": "/icons/user-settings.svg"
  },
  {
    "id": "volume-high",
    "assetNum": "57",
    "category": "media",
    "label": "Volume High",
    "path": "/icons/volume-high.svg"
  },
  {
    "id": "volume-low",
    "assetNum": "56",
    "category": "media",
    "label": "Volume Low",
    "path": "/icons/volume-low.svg"
  },
  {
    "id": "volume-max",
    "assetNum": "72",
    "category": "media",
    "label": "Volume Max",
    "path": "/icons/volume-max.svg"
  },
  {
    "id": "warning-triangle",
    "assetNum": "239",
    "category": "interface",
    "label": "Warning Triangle",
    "path": "/icons/warning-triangle.svg"
  },
  {
    "id": "wave-chart",
    "assetNum": "44",
    "category": "business",
    "label": "Wave Chart",
    "path": "/icons/wave-chart.svg"
  },
  {
    "id": "wifi",
    "assetNum": "20",
    "category": "navigation",
    "label": "Wifi",
    "path": "/icons/wifi.svg"
  },
  {
    "id": "x-circle",
    "assetNum": "300",
    "category": "interface",
    "label": "X Circle",
    "path": "/icons/x-circle.svg"
  },
  {
    "id": "x-circle-alt",
    "assetNum": "244",
    "category": "shopping",
    "label": "X Circle Alt",
    "path": "/icons/x-circle-alt.svg"
  },
  {
    "id": "x-close",
    "assetNum": "33",
    "category": "interface",
    "label": "X Close",
    "path": "/icons/x-close.svg"
  },
  {
    "id": "x-mark",
    "assetNum": "240",
    "category": "interface",
    "label": "X Mark",
    "path": "/icons/x-mark.svg"
  },
  {
    "id": "zoom-in",
    "assetNum": "110",
    "category": "interface",
    "label": "Zoom In",
    "path": "/icons/zoom-in.svg"
  }
];
