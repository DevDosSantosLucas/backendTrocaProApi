import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateItemTable1609646540494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
              //REALIZAR ALTERAÇÕES
      //CRIAR TABELA, CRIAR UM NOVO CAMPO, DELETAR ALGUM CAMPO
      await queryRunner.createTable(new Table({ 
        name: 'items',
        columns: [
          {
            name: 'item_id',
            type: 'uuid',
            isPrimary: true, //chave primaria;
            generationStrategy: 'uuid', 
            default: 'uuid_generate_v4()'
            
          },
          {
            name: 'name_item',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'decimal',
          },
          {
            name: 'category',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text'
          },
          {
            name: 'user_id',
            type: 'uuid'
          }
        ],
        foreignKeys: [
            {
              name: 'item_fk',
              columnNames:['user_id'],     // Qual o nome da coluna que irá armazenar o relacionameto;
              referencedTableName:'users', // Qual tabela está se relacionado;
              referencedColumnNames: ['user_id'],    // Qual a coluna na tabela de users que está se referenciando;
              onUpdate: 'CASCADE',              //Atualiza id sem perder a referencia das imagens existentes;
              onDelete: 'CASCADE'               // Quando o orphanege for deletado as imagem será também deletadas;
            }
          ]
      }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
   //DESFAZER O QUE FOI FEITO NO UP
      await queryRunner.dropTable('items');
    }

}
