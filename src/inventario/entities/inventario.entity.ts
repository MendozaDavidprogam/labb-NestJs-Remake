import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Producto } from "src/producto/entities/producto.entity";
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
    
    //Relación con Producto
    @OneToOne(() => Producto, { eager: true }) 
    @JoinColumn({ name: "idproducto" }) // Foreign Key
    producto: Producto;

}
