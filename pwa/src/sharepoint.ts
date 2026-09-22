import { BrowserCacheLocation, PublicClientApplication } from "@azure/msal-browser";
import type { LocalSaveBundle } from "./types";

const tenantId = "9164985b-f4dd-4a6a-9381-9b7880b36096";
const clientId = "e16a5974-00a4-4e63-aa25-1f0dd81d5e40";
const graphScopes = ["User.Read", "Files.ReadWrite.All"];
const siteHost = "synteckinfo.sharepoint.com";
const sitePath = "/sites/Infini-Story";
const saveFolderPath = "Aventures/SynikWulf";
const activeSaveName = "infini-story-demo.json";

export interface CloudSave {
  id: string;
  name: string;
  modifiedAt: string;
  size: number;
}

export interface ConnectedAccount {
  name: string;
  username: string;
}

const msal = new PublicClientApplication({
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: `${window.location.origin}${import.meta.env.BASE_URL}`,
  },
  cache: { cacheLocation: BrowserCacheLocation.SessionStorage },
});

let initialized = false;
let siteDrivePromise: Promise<string> | null = null;

async function initialize() {
  if (!initialized) {
    await msal.initialize();
    initialized = true;
  }
}

function currentAccount() {
  return msal.getActiveAccount() ?? msal.getAllAccounts()[0] ?? null;
}

export async function getConnectedAccount(): Promise<ConnectedAccount | null> {
  await initialize();
  const account = currentAccount();
  if (!account) return null;
  msal.setActiveAccount(account);
  return { name: account.name ?? account.username, username: account.username };
}

export async function signIn(): Promise<ConnectedAccount> {
  await initialize();
  const result = await msal.loginPopup({ scopes: graphScopes, prompt: "select_account" });
  msal.setActiveAccount(result.account);
  return { name: result.account.name ?? result.account.username, username: result.account.username };
}

export async function signOut() {
  await initialize();
  const account = currentAccount();
  if (account) await msal.logoutPopup({ account, mainWindowRedirectUri: window.location.href });
}

async function accessToken() {
  await initialize();
  const account = currentAccount();
  if (!account) throw new Error("CONNECT_REQUIRED");
  msal.setActiveAccount(account);
  try {
    return (await msal.acquireTokenSilent({ account, scopes: graphScopes })).accessToken;
  } catch {
    return (await msal.acquireTokenPopup({ account, scopes: graphScopes })).accessToken;
  }
}

async function graph(path: string, init: RequestInit = {}) {
  const token = await accessToken();
  const response = await fetch(`https://graph.microsoft.com/v1.0${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
  });
  if (!response.ok) throw new Error(`GRAPH_${response.status}`);
  return response;
}

async function driveId() {
  if (!siteDrivePromise) {
    siteDrivePromise = (async () => {
      const site = await (await graph(`/sites/${siteHost}:${sitePath}`)).json() as { id: string };
      const drive = await (await graph(`/sites/${site.id}/drive`)).json() as { id: string };
      return drive.id;
    })();
  }
  return siteDrivePromise;
}

export async function listCloudSaves(): Promise<CloudSave[]> {
  const drive = await driveId();
  const folder = encodeURIComponent(saveFolderPath).replace(/%2F/g, "/");
  const response = await graph(`/drives/${drive}/root:/${folder}:/children?$select=id,name,lastModifiedDateTime,size&$orderby=lastModifiedDateTime desc`);
  const data = await response.json() as { value: Array<{ id: string; name: string; lastModifiedDateTime: string; size: number }> };
  return data.value
    .filter((file) => file.name.endsWith(".json"))
    .map((file) => ({ id: file.id, name: file.name, modifiedAt: file.lastModifiedDateTime, size: file.size }));
}

export async function saveToCloud(bundle: LocalSaveBundle) {
  const drive = await driveId();
  const folder = encodeURIComponent(saveFolderPath).replace(/%2F/g, "/");
  await graph(`/drives/${drive}/root:/${folder}/${activeSaveName}:/content`, {
    method: "PUT",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(bundle, null, 2),
  });
}

export async function loadFromCloud(): Promise<LocalSaveBundle> {
  const drive = await driveId();
  const folder = encodeURIComponent(saveFolderPath).replace(/%2F/g, "/");
  const response = await graph(`/drives/${drive}/root:/${folder}/${activeSaveName}:/content`);
  return await response.json() as LocalSaveBundle;
}
