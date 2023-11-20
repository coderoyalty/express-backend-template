import express from "express";
import ControllerBase from "@/controllers/base.controller";
import Controller from "@/utils/controller.decorator";
import { Get, Patch, Post, Put } from "@/utils/route.decorator";

const todos = [
	{
		userId: 1,
		id: 1,
		title: "delectus aut autem",
		completed: false,
	},
	{
		userId: 1,
		id: 2,
		title: "quis ut nam facilis et officia qui",
		completed: false,
	},
	{
		userId: 2,
		id: 3,
		title: "fugiat veniam minus",
		completed: false,
	},
	{
		userId: 2,
		id: 4,
		title: "et porro tempora",
		completed: true,
	},
	{
		userId: 3,
		id: 5,
		title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
		completed: false,
	},
];

let nextId = todos.length;

@Controller()
export class TodoController extends ControllerBase {
	constructor() {
		super("/users/:id/todos");
	}

	@Get("/")
	async fetchAll(req: express.Request, res: express.Response) {
		const { id } = req.params;
		const data = todos.filter(todo => todo.userId === parseInt(id));

		res.json({
			data,
			count: data.length,
		});
	}

	@Get("/:todoId")
	async fetch(req: express.Request, res: express.Response) {
		const { todoId, id } = req.params;
		const todo = todos.find(
			todo => todo.id === parseInt(todoId) && todo.userId === parseInt(id),
		);

		if (!todo) {
			return res.sendStatus(404);
		}
		res.json(todo);
	}

	@Post("/")
	async createTodo(req: express.Request, res: express.Response) {
		const { id } = req.params;
		const { title } = req.body;
		const data = {
			userId: parseInt(id),
			id: ++nextId,
			title,
			completed: false,
		};

		todos.push(data);

		return res.status(201).json(data);
	}

	@Patch("/:todoId")
	@Put("/:todoId")
	async updateStatus(req: express.Request, res: express.Response) {
		const { id, todoId } = req.params;
		const todo = todos.find(
			value => value.id === parseInt(todoId) && value.userId === parseInt(id),
		);

		if (!todo) return res.sendStatus(404);

		const { completed } = req.body;
		todo.completed = completed;

		return res.json(todo);
	}
}
