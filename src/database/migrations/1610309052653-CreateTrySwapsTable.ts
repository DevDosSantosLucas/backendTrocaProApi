import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTrySwapsTable1610309052653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: "swaps",
            columns: [
              {
                name: 'swap_id',
                type: 'uuid',
                isPrimary: true, //chave primaria;
                generationStrategy: 'uuid', 
                default: 'uuid_generate_v4()'
              },
              {
                name: 'item_id',
                type: 'uuid'
              },
              {
                name: 'targed_item_id',
                type: 'uuid'
              },
            ],
            foreignKeys: [
              {
                name: 'item_info',
                columnNames:['item_id'],     // Qual o nome da coluna que irá armazenar o relacionameto;
                referencedTableName:'items', // Qual tabela está se relacionado;
                referencedColumnNames: ['item_id'],    // Qual a coluna na tabela de orphanages que está se referenciando;
                onUpdate: 'CASCADE',              //Atualiza id sem perder a referencia das imagens existentes;
                onDelete: 'CASCADE'               // Quando o orphanege for deletado as imagem será também deletadas;
              },
              {
                name: 'item_info_targed',
                columnNames:['targed_item_id'],     // Qual o nome da coluna que irá armazenar o relacionameto;
                referencedTableName:'items', // Qual tabela está se relacionado;
                referencedColumnNames: ['item_id'],    // Qual a coluna na tabela de items que está se referenciando;
                onUpdate: 'CASCADE',              //Atualiza id sem perder a referencia das imagens existentes;
                onDelete: 'CASCADE'               // Quando o orphanege for deletado as imagem será também deletadas;
              }
            ]
          }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
            //DESFAZER O QUE FOI FEITO NO UP
      await queryRunner.dropTable('swaps');
    }

}
