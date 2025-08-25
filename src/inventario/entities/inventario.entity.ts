import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Producto } from "src/producto/entities/producto.entity";

export class Inventario{
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    existencias: number;

    // Relacion OneToMany con Producto
    @OneToMany(() => Producto, producto => producto.inventario)
    productos: Producto[];

    @Column({ default: 'activo' })
    estado: string;



}
