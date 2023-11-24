import { Request, Response } from "express";
import Controller from "@/utils/controller.decorator";
import BaseController from "./base.controller";
import { Get, Post } from "@/utils/route.decorator";

@Controller()
export class UserController extends BaseController {
	constructor() {
		super("/users");
	}

	@Get("/:id")
	async read(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/users/${id}`,
			);
			const data = await response.json();
			return res.send(data);
		} catch (err) {
			res.sendStatus(500);
		}
	}

	@Post("/:id/posts")
	async create(req: Request, res: Response) {
		const { id } = req.params;
		const data = req.body;
		const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
			method: "POST",
			body: JSON.stringify({
				...data,
				userId: id,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		});
		res.status(201).json(await response.json());
	}
}
