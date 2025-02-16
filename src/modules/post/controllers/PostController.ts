import { Request, Response, NextFunction } from 'express'
import { PostUseCase } from '../useCases/PostUseCase'
import {
  IRequestCreatePost,
  IRequestGetPostByType,
} from '@/interfaces/post/request'

export class PostController {
  private postUseCase: PostUseCase

  constructor() {
    this.postUseCase = new PostUseCase()
  }

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      // Utilizando Parse para converter o Text da request para JSON em uma mesma requisição com FIle e JSON (Form-data)
      const body: IRequestCreatePost['post'] = JSON.parse(req.body.data)
      const { file } = req
      const { id } = req.userAuth

      const payload: IRequestCreatePost = {
        post: {
          title: body.title,
          description: body.description,
          likes: 0,
          type: body.type,
          userId: id,
          companyId: body.companyId,
        },
        file: file!,
      }

      await this.postUseCase.create(payload)

      return res.status(201).json({
        message: 'Post criado com sucesso.',
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Erro inesperado. Por favor, recarregue novamente a página.',
        })
      }

      return next(error)
    }
  }

  getPostsByType = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { page, perPage, type } = req.query

      const payload: IRequestGetPostByType = {
        page: Number(page),
        perPage: Number(perPage),
        type: Number(type),
      }

      const { posts, maxPage, rows, totalRows } =
        await this.postUseCase.getPostsByType(payload)

      return res.status(200).json({
        posts,
        currentPage: Number(page),
        maxPage,
        rows,
        totalRows,
        message: 'Posts resgatados com sucesso.',
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Erro inesperado. Por favor, recarregue novamente a página.',
        })
      }

      return next(error)
    }
  }

  getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.query

      const { post } = await this.postUseCase.getPostById(Number(id))

      return res.status(200).json({
        post,
        message: 'Postagem encontrada com sucesso.',
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Erro inesperado. Por favor, recarregue novamente a página.',
        })
      }

      return next(error)
    }
  }
}
