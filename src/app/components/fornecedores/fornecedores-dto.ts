import { Endereco } from "../../endereco/endereco-dto"

export interface Fornecedor {
    id?: number
    companyName: string
    contactName: string
    contactTitle: string
    address: Endereco
}
