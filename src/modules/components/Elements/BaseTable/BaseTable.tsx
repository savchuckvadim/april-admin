import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from "@mui/material"
import { NavLink } from "react-router-dom"
import style from './BaseTable.module.scss'
import { NumberLiteralType } from "typescript/lib/tsserverlibrary"
import { ComplectTypesEnum, ConsaltingType, SupplyTypesEnum } from "../../../types/types"
import { updateClientRegions } from "../../../redux/reducers/client/client-reducer"
import { string } from "yup"
import InputCell from "../../Elements/BaseTable/Input/InputCell"


type TableValueType = ClientValueType | ContractValueType | SupplyValueType | ComplectValueType |
    RegionValueType | ConsaltingValueType | LegalTechValueType | PriceValueType


type BaseTablePropsType = {
    clientId?: number | null
    categories: Array<string>
    values: Array<TableValueType>
    type: 'complects' | 'products' | 'fields' | 'clients' | 'regions' | 'contracts' | 'consalting' | 'legalTech' | 'price'
    withLinks: boolean
    clientRegions?: Array<number>
    isClient?: boolean
    checked?: Array<number>
    updateClientRegions?: (regionId: number, checked: boolean) => void

}



const BaseTable: React.FC<BaseTablePropsType> = ({ clientId, categories, values, type, withLinks, clientRegions, checked, updateClientRegions }) => {


    return (
        <TableContainer sx={{ borderRadius: 2, boxShadow: 'none' }} component={Paper} className={style.table}>
            <Table sx={{}} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        {type === 'regions' && <TableCell align="right">{'check'}</TableCell>}
                        {categories.map(c => {
                            if (c === 'email' || c === 'domain' || c === 'infoblock' || c === 'type' ||
                                c === 'supply' || c === 'contract' || c === 'region' || c === 'value' || c === 'mesureName' || c === 'bitrixName') {
                                return <TableCell align="right">{c}</TableCell>
                            } else {
                                return <TableCell align="left" >{c}</TableCell>
                            }
                        })}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {values.map((row: TableValueType, i) => {
                        let generalCells = []
                        for (const key in row) {


                            //@ts-ignore
                            if (key === 'name' && type !== "regions") {

                                generalCells.push(<TableCell key={`base-table-${key}-${row[key]}-${i}`} component="th" scope="row">
                                    {withLinks
                                        ? <NavLink key={`base-table-link-${key}-${row[key]}-${i}`} to={`../${type}/${row.number}`}>
                                            {row.name}
                                        </NavLink>
                                        : row.name
                                    }
                                </TableCell>)
                            }
                            else if (key === 'title' && type === "regions") {
                                const checked = clientRegions?.includes(row.number) || false

                                generalCells.push(<TableCell key={`base-table-${row.number}-${key}-regions-${i}`} component="th" scope="row">
                                    <Checkbox checked={checked} onClick={() => { updateClientRegions && updateClientRegions(row.number, checked) }} />
                                </TableCell>)

                                generalCells.push(<TableCell key={`base-table-${row.number}-${key}-regions-${i}`} component="th" scope="row">
                                    {withLinks
                                        ? <NavLink key={`base-table-link-${key}-regions-${i}`} to={`../${type}/${row.number}`}>
                                            {//@ts-ignore
                                                row.title && row.title}
                                        </NavLink>
                                        //@ts-ignore
                                        : row.title
                                    }
                                </TableCell>)
                            }

                            else if (key === 'checked' && type === "contracts") {



                                generalCells.push(<TableCell key={`base-table-${row.number}-${key}-regions-${i}`} component="th" scope="row">
                                    {  //@ts-ignore

                                        <Checkbox checked={row.checked} onClick={() => { }} />}
                                </TableCell>)
                            }
                            else if (key === 'supply' || key === 'contract') {

                                //@ts-ignore
                                generalCells.push(<TableCell key={`base-table-${key}-${row[key]}-${i}`} align="right">{row[key]}</TableCell>)
                            }
                            else if ((key === 'measureId' || key === 'itemId') && type === "contracts") {




                                generalCells.push(
                                    <InputCell
                                        clientId={clientId}
                                        updateField={() => console.log(clientId)}
                                        field={row}
                                        isEditable={false}
                                        //@ts-ignore
                                        value={row[key]}
                                        type={key}
                                        name={`contracts.items.${row.number}.${key}`}
                                       
                                        />
                                )
                            }

                            //@ts-ignore
                            else if (key !== 'name' && key !== 'type' && key !== 'number') {

                                //@ts-ignore
                                generalCells.push(<TableCell key={`base-table-${key}-${row[key]}-${i}`} align="right">{row[key]}</TableCell>)
                            }
                            // @ts-ignore
                            else if (key === 'type') {

                                //@ts-ignore
                                generalCells.push(<TableCell key={`base-table-${key}-${row[key]}-${i}`} align="right">{row[key]}</TableCell>)
                            }

                        }

                        return <TableRow
                            key={`${row.name}-${i}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >


                            {
                                generalCells
                            }



                        </TableRow>

                    })}

                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default BaseTable























export type ClientValueType = {
    name: string
    number: number
    domain: string
    email: string
}

export type SupplyValueType = {
    name: string
    number: number
    coefficient: number,
    type: SupplyTypesEnum
}

export type ComplectValueType = {
    name: string
    number: number
    weight: number,
    type: ComplectTypesEnum
}

export type RegionValueType = {
    number: number
    name: string
    title: string
    abs: number
    infoblock: string
    // weight: number,

}

export type ContractValueType = {
    name: string
    title?: string | null
    itemId?: number | null
    measureId: number | null
    number: number
    measureName: string
    bitrixName: string
    bitrixId?: string | null
    checked: boolean
    type: 'contracts'
    // weight: number,

}

export type ConsaltingValueType = {

    name: string
    number: number
    contractProp: string
    contractComment: string
    // weight: number,

}

export type LegalTechValueType = {
    name: string
    number: number
    weight: 1 | 2 | 5 | 10
    msk?: number | null
    regions?: number | null
    type: 'package' | 'lt'

    // weight: number,

}
export type PriceValueType = {
    number: number
    name: string
    supply: string
    contract: string
    value: number

}