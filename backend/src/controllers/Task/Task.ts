import {prisma} from '../../lib/prisma';

const getAll = (req: any, res: any) => {
    try {
        prisma.task.findMany().then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(500).json({ message: "Internal server error" });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getUsertask = (req: any, res: any) => {
    try {
        const userId = req.params.userId;
        prisma.task.findMany({
            where: {
                userId: userId
            }
        }).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(500).json({ message: "Internal server error" });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getOne = (req: any, res: any) => {
    try {
        const taskId = req.params.taskId;
        prisma.task.findUnique({
            where: {
                id: taskId
            }
        }).then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        }).catch((error) => {
            res.status(500).json({ message: "Internal server error" });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteOne = (req: any, res: any) => {
    try {
        const taskId = req.params.taskId;
        prisma.task.delete({
            where: {
                id: taskId
            }
        }).then((data) => {
            res.status(200).json({ message: "Task deleted successfully" });
        }).catch((error) => {
            res.status(500).json({ message: "Internal server error" });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateOne = (req: any, res: any) => {
    try {
        const taskId = req.params.taskId;
        const { title, description, status } = req.body;
        prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                title,
                description,
                status
            }
        }).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(500).json({ message: "Internal server error" });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
const createOne = (req: any, res: any) => {
    try {
        const { title, userId } = req.body;
        prisma.task.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                userId: req.body.userId,
            }
        }).then((data) => {
            res.status(201).json(data);
        }).catch((error) => {
            res.status(500).json({ message: "Internal server error" });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const taskController = {
    getAll,
    getUsertask,
    getOne,
    deleteOne,
    updateOne,
    createOne
}
