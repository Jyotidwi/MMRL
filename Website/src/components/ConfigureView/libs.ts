import Video from "@Components/dapi/Video";
import Anchor from "@Components/dapi/Anchor";
import { DiscordWidget } from "@Components/dapi/DiscordWidget";
import { BottomToolbar } from "@Components/onsenui/BottomToolbar";
import { Page } from "@Components/onsenui/Page";
import { Tabbar } from "@Components/onsenui/Tabbar";
import Sandbox from "@nyariv/sandboxjs";
import { useTheme } from "@Hooks/useTheme";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { useNativeProperties } from "@Hooks/useNativeProperties";
import { Markdown, PromoBanner } from "./components";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { SuFile } from "@Native/SuFile";
import { StringsProvider, useStrings } from "@Hooks/useStrings";
import { Shell } from "@Native/Shell";

export const libraries = [
  {
    name: "react",
    __esModule: require("react"),
  },
  {
    name: "@mui/material",
    __esModule: require("@mui/material"),
  },
  {
    name: "@mui/lab",
    __esModule: require("@mui/lab"),
  },
  {
    name: "@mui/icons-material",
    __esModule: require("@mui/icons-material"),
  },
  {
    name: "@mmrl/ui",
    __esModule: {
      Anchor: Anchor,
      Page: Page,
      BottomToolbar: BottomToolbar,
      Tabbar: Tabbar,
      Toolbar: Toolbar,
      Video: Video,
      DiscordWidget: DiscordWidget,
      PromoBanner: PromoBanner,
      Markdown: Markdown,
    },
  },
  {
    name: "@mmrl/hooks",
    __esModule: {
      useActivity: useActivity,
      useNativeProperties: useNativeProperties,
      useNativeStorage: useNativeStorage,
      useTheme: useTheme,
      useStrings: useStrings,
    },
  },
  {
    name: "@mmrl/providers",
    __esModule: {
      StringsProvider: StringsProvider,
    },
  },

  {
    name: "@mmrl/sufile",
    __esModule: {
      read: SuFile.read,
      write: SuFile.write,
      list: SuFile.list,
      exist: SuFile.exist,
      delete: SuFile.delete,
      deleteRecursive: SuFile.deleteRecursive,
    },
  },
  {
    name: "@mmrl/shell",
    __esModule: {
      getRootManager: Shell.getRootManager,
      isKernelSU: Shell.isKernelSU,
      isMagiskSU: Shell.isMagiskSU,
      VERSION_CODE: Shell.VERSION_CODE,
      VERSION_NAME: Shell.VERSION_NAME,
      pw_uid: Shell.pw_uid,
      pw_gid: Shell.pw_gid,
      pw_name: Shell.pw_name,
    },
  },
];

const prototypeWhitelist = Sandbox.SAFE_PROTOTYPES;
prototypeWhitelist.set(Node, new Set());

export const globals = {
  ...Sandbox.SAFE_GLOBALS,
  JSON: JSON,
  YAML: require("yaml"),
  INI: require("ini"),
  Object,
};
