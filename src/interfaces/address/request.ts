import { TCreateAddress, TUpdateAddress } from '@/@types/TAddress'

interface IRequestCreateAddress extends TCreateAddress {}
interface IRequestUpdateAddress extends TUpdateAddress {}

export { IRequestCreateAddress, IRequestUpdateAddress }
