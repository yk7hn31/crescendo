import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ItemType } from "@/definitions/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertType(type: 'track' | 'collection' | 'artist'): ItemType {
  return type === 'artist' ? 'artist' : type === 'collection' ? 'album' : 'song';
}

export function identifyType(id: string): ItemType {
  return id.startsWith('a') ? 'artist' : id.startsWith('c') ? 'album' : 'song';
}