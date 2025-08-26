import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Producto } from "src/producto/entities/producto.entity";


@Entity('inventario')
export class Inventario{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    existencias: number;

    // Relacion con Producto
    @OneToMany(() => Producto, producto => producto.inventario)
    productos: Producto[];

    @Column()
    estado: string;

}
