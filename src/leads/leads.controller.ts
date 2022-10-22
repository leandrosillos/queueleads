import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { AddLeadDto } from './dto/add-lead.dto';
import { Response } from 'express';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { Knex } from 'knex';
import { KnexHelper } from './common/helper/Knex.helper';
import * as fs from 'fs';

@Controller('leads')
export class LeadsController {
  private knex: Knex;

  constructor(@Inject('RMQS') private client: ClientProxy) {
    this.knex = KnexHelper.getInstance();
  }

  @Post()
  create(@Body() addLeadDto: AddLeadDto, @Res() res: Response) {
    //AddLeads in files to backup
    fs.appendFileSync('./leads.md', `\n${JSON.stringify(addLeadDto)},`);

    const retorno = {
      status: true,
      title: 'Contato enviado com sucesso.',
      message:
        'Em até 24 horas úteis nossa equipe comercial entrará em contato com você para entender um pouco mais sobre o seu negócio e construiremos uma proposta personalizada com objetivo de aumentar seu faturamento e lucro. Caso desista nos 3 primeiros meses, devolvemos qualquer mensalidade investida.\n\nAtt.\nEquipe CRM&BONUS',
      redirect: '/',
    };

    // Mandar msg no RabbitMQ (Enfileirar)
    this.client.send('queuelead', JSON.stringify(addLeadDto)).subscribe();
    // Salvar no Banco (PrismoIo)

    res.status(HttpStatus.CREATED).json(retorno);
  }
  // Criar Consumer (Ler fila)

  @MessagePattern('queuelead')
  // Salvar no Banco (PrismoIo)
  async addLeadQueue(@Payload() body: any) {
    const lead = JSON.parse(body);

    const saveLead = {
      name: lead.name,
      empresa: lead.empresa,
      pay_indication_id: lead.pay_indication_id,
      responsavel: lead.responsavel,
      email: lead.email,
      telefone: lead.telefone,
      contatado: false,
      country_customer_id: lead.country_customer_id,
      locale: 'crmbonus.com.br',
      qtd_store: lead.qtd_store,
      tkt_medio: lead.tkt_medio,
      media_venda_loja: lead.media_venda_loja,
      segmento: lead.segmento,
      canal_gerador: lead.canal_gerador,
      comentarios: lead.comentarios,
      type: 'site/rmq',
      created: new Date(),
      modified: new Date(),
    };
    try {
      console.log(await this.knex('leads').insert(saveLead));
    } catch (err) {
      console.log(err);
    }
  }
}
