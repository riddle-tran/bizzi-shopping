import { IAssets } from "assets"

export type TProduct = {
	id: string
	icon?: keyof IAssets
	price: number
	productName: string
	description?: string
}