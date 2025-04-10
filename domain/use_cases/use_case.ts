import { Response } from "@/data/response/response";

export default interface UseCase<P, R> {
    execute(params: P): Promise<Response<R>>;
}