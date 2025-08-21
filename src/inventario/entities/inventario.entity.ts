import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Inventario{
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idproducto: number;

    @Column()
    nombre: string;

    @Column()
    existencias: number;
    
/*
    @Column()
    estado: string;
*/
}
