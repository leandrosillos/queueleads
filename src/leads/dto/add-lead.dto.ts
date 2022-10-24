import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddLeadDto {
  @IsNotEmpty()
  canal_gerador: string;

  @IsNotEmpty()
  comentarios: string;

  @IsNotEmpty()
  country_customer_id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  empresa: string;

  @IsNotEmpty()
  media_venda_loja: number;

  @IsNotEmpty()
  pay_indication_id: boolean;

  @IsNotEmpty()
  qtd_store: number;

  @IsNotEmpty()
  responsavel: string;

  @IsNotEmpty()
  segmento: string;

  @IsNotEmpty()
  telefone: string;

  @IsNotEmpty()
  tkt_medio: string;
}
