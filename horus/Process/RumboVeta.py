import math
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
import Util.util as util
from matplotlib.ticker import FuncFormatter

class RumboVeta: 
    frameCanvas3D = None

    def __init__(self):
        print('Inicio de Rumbo Veta')
        
    def setGrafico3D(self, frameCanvas3D):
        self.frameCanvas3D = frameCanvas3D
 
  
      # Calcular El caso que corresponde
    def analisisRumboVeta(self, punto1, punto2): #UTM
        # Tenemos el punto 1 y luego el punto 2 con sus coordenadas UTM
        # Calculamos el rumbo de la veta (Rv) segun las coordenadas UTM
        try:
            x1, y1, z1 = punto1
            x2, y2 = punto2
            caso = None
            titulo = None
            azimut = None
            Rv = None
            # plano cartesiano con puntos cardinales 
            # donde se coloca una flecha apuntando del punto 1 al punto 2 
            # siendo la interseccion del plano cartesiano la mitad de la flecha de punto 1 punto 2 
            if x1 > x2 and y1 > y2  and (y1 - y2) != 0: # si el punto 2 esta en la parte inferior izquierda
                Rv = math.atan((x1 - x2)/(y1 - y2))*180/math.pi
                caso = "Caso 1"
                titulo = "SW"  # la flecha apunta al SurOeste
                azimut = (180 + Rv)

            elif x2 > x1 and y2 > y1 and (y2 - y1) != 0: # si el punto 2 esta en la parte superior derecha
                Rv = math.atan((x2 - x1)/(y2 - y1))*180/math.pi
                caso = "Caso 1"
                titulo = "NE" # la flecha apunta al NorEste
                azimut = Rv

            elif x1 > x2  and y2 > y1 and (y2 - y1) != 0: # si el punto 2 esta en la parte superior izquierda
                Rv = math.atan((x1 - x2)/(y2 - y1))*180/math.pi
                caso = "Caso 2"
                titulo = "NW" # la flecha apunta al Noroeste
                azimut = (360 - Rv)

            elif x2 > x1  and y1 > y2 and (y1 - y2) != 0: # si el punto 2 esta en la parte inferior derecha
                Rv = math.atan((x2 - x1)/(y1 - y2))*180/math.pi
                caso = "Caso 2"
                titulo = "SE" # La flecha apunta al SurEste
                azimut = (180 - Rv)
            
            return {"caso": caso, "titulo": titulo, "azimut": azimut, "Rv": Rv}

        except ValueError:
            # Manejar la excepción de valor no válido (por ejemplo, cuando se ingresa texto en lugar de un número)
            print('Error: Ingrese un número válido.')
        except Exception as e:
            # Manejar otras excepciones no específicas
            print(f'Se produjo un error: {e}')
        return False

    def visualizar_cuadrado_3d(self, EM, puntoAltoE, puntoAltoW, puntoBajoE, puntoBajoW, PC,  EP, distancias, frente, montos, Estadodistancia):
        # # Coordenadas del punto alto Este
        # Coordenadas adicionales para un lado del cuadrado bajando a la línea lateral 1
        puntoBajoE_linea1 = (puntoAltoE[0], puntoAltoE[1], puntoAltoW[2])
        # Crear la figura y los ejes 3D
        fig = plt.figure()
        ax = fig.add_subplot(111, projection='3d')


        #empieza el cuadrado-----------------
        # Definir los vértices del cuadrado
        cuadrado_vertices = np.array([
            [puntoAltoE[0], puntoAltoE[1], puntoAltoE[2]],
            [puntoAltoW[0], puntoAltoW[1], puntoAltoW[2]],
            [puntoBajoW[0], puntoBajoW[1], puntoBajoW[2]],
            [puntoBajoE[0], puntoBajoE[1], puntoBajoE[2]],
            [puntoBajoE_linea1[0], puntoBajoE_linea1[1], puntoBajoE_linea1[2]]
        ])

        # Graficar el cuadrado con un degradado dorado para simular rugosidad
        cuadrado = Poly3DCollection([cuadrado_vertices], facecolors=['#ffd700', '#ffd700', '#c0a000', '#c0a000', '#ffd700'], alpha=0.5)
       
        ax.add_collection3d(cuadrado)
        #termina el cuadrado-----------------

        # Graficar los puntos adicionales
        ax.scatter(*zip(PC), color='red', label='PC')
        ax.scatter(*zip(EP), color='blue', label='EP')
        ax.scatter(*zip(frente), color='green', label='frente')
        ax.scatter(*zip(EM), color='black', label='EM')
        
        if(Estadodistancia == "Positivo"):
            # Flecha desde frente hacia PC
            arrow_length_ratio = 0.05
            arrow_direction = (PC[0] - frente[0], PC[1] - frente[1], PC[2] - frente[2])
            arrow_start = frente
            arrow_endPC = PC
            arrow_endEP = EP
            ax.quiver(arrow_start[0], arrow_start[1], arrow_start[2], arrow_direction[0], arrow_direction[1], arrow_direction[2], color='red', arrow_length_ratio=arrow_length_ratio, label='Flecha de frente a PC', linewidth=1)

            # Flecha desde frente hacia EP
            arrow_direction1 = (EP[0] - frente[0], EP[1] - frente[1], EP[2] - frente[2])
            arrow_start1 = frente
            ax.quiver(arrow_start1[0], arrow_start1[1], arrow_start1[2], arrow_direction1[0], arrow_direction1[1], arrow_direction1[2],
                    color='blue', arrow_length_ratio=arrow_length_ratio, label='Flecha de frente a EP', linewidth=1)
            # Texto "Camino a PC"
            middle_point_pc = ((arrow_start[0] + arrow_endPC[0]) / 2, (arrow_start[1] + arrow_endPC[1]) / 2, (arrow_start[2] + arrow_endPC[2]) / 2)

            # Texto "Camino a PC" con ángulo de inclinación de 45°
            ax.text(middle_point_pc[0], middle_point_pc[1], middle_point_pc[2], "Rumbo a PC",
                    fontsize=10, ha='center', va='center', color='red')
            
            # Texto "Camino a EP"
            middle_point_ep = ((arrow_start[0] + arrow_endEP[0]) / 2, (arrow_start[1] + arrow_endEP[1]) / 2, (arrow_start[2] + arrow_endEP[2]) / 2)
            ax.text(middle_point_ep[0], middle_point_ep[1], middle_point_ep[2], "Rumbo a EP",
                    fontsize=10, ha='center', va='bottom', color='blue')

        # Etiquetas EM, EP, PC, Frente
        ax.text(EM[0], EM[1], EM[2],  f"EM", fontsize=10, ha='right', va='bottom', color='black', rotation='horizontal')
        ax.text(EP[0], EP[1], EP[2],  f"EP", fontsize=10, ha='right', va='bottom', color='blue', rotation='horizontal')
        ax.text(PC[0], PC[1], PC[2],  f"PC", fontsize=10, ha='right', va='bottom', color='red', rotation='horizontal')
        ax.text(frente[0], frente[1], frente[2],  f"F", fontsize=10, ha='right', va='bottom', color='green', rotation='horizontal')

        # Definir los vértices de las líneas laterales
        x_linea1 = np.array([puntoAltoE[0], puntoAltoW[0]])
        y_linea1 = np.array([puntoAltoE[1], puntoAltoW[1]])
        z_linea1 = np.array([puntoAltoE[2], puntoAltoW[2]])

        x_linea2 = np.array([puntoBajoE[0], puntoBajoW[0]])
        y_linea2 = np.array([puntoBajoE[1], puntoBajoW[1]])
        z_linea2 = np.array([puntoBajoE[2], puntoBajoW[2]])

        # Graficar las líneas laterales
        ax.plot(x_linea1, y_linea1, z_linea1, color='orange', linestyle='solid', label='Línea lateral 1', linewidth=2)
        ax.plot(x_linea2, y_linea2, z_linea2, color='orange', linestyle='dashed', label='Línea lateral 2')

        # Limpia el grafico
        Limites3D = util.limitesEjes3D(puntoAltoE, puntoAltoW,  puntoBajoE, puntoBajoW, frente)

        (MargenDerechoX, MargenIzquierdoX) =Limites3D[0]
        (MargenDerechoY, MargenIzquierdoY) =Limites3D[1]
        (MargenDerechoZ, MargenIzquierdoZ) =Limites3D[2]

        # Ajustar los límites de los ejes para acercar la vista
        ax.set_xlim([MargenIzquierdoX, MargenDerechoX])
        ax.set_ylim([MargenIzquierdoY, MargenDerechoY])
        ax.set_zlim([MargenIzquierdoZ, MargenDerechoZ])
        
        self.Formateador(ax)

        # Etiquetas y título
        ax.set_xlabel(r"$\mathbf{ESTE}$")
        ax.set_ylabel(r"$\mathbf{NORTE}$")
        ax.set_zlabel(r"$\mathbf{COTA}$")
        ax.set_title(r"$\mathbf{SIMULACIÓN\ 3D}$")

        # Leyenda
        ax.legend().set_visible(False)
        
        # Mostrar el gráfico
        # Dibujar el nuevo gráfico en el lienzo
        canvas = FigureCanvasTkAgg(fig, master = self.frameCanvas3D)
        canvas.get_tk_widget().pack(side='top', fill='both', expand=1)

  # formatea los lados x y y
    def Formateador(self, ax):
        formatter = FuncFormatter(self.format_tick)
        ax.xaxis.set_major_formatter(formatter)
        ax.yaxis.set_major_formatter(formatter)

    def puntoMedio(self, punto1, punto2):
        # Calcular el punto medio entre dos puntos
        medio_x = (punto1[0] + punto2[0]) / 2
        medio_y = (punto1[1] + punto2[1]) / 2
        return medio_x, medio_y
    
    # Función para formatear los ticks en formato entero
    def format_tick(self, value, tick_number):
        # Función para formatear los ticks en formato entero
        return f'{int(value)}'


    def hallar_formato_Caso(self, Caso, DB,  Rv, EM, Frente):
        # -----------Sistema Rotafrente --------
        # (vease imagen Sistema_Rotafrente1.jpg  y  Sistema_Rotafrente2.jpg)
        # nos permite recuperar la Zona y el formato que debe ejecutarse en nuestro archivo Core.py
        Zona = None
        (EEM, NEM, CEM) = EM
        (EF, NF, CF) = Frente
        
        # Visualizamos en que cuadrante se encuentra el Frente con respecto a EM
        cuadrante = self.hallar_cuadrante_frente(EM, Frente) 
        if(cuadrante == "C I"):
            Alfa = math.atan((EF - EEM)/(NF - NEM))*180/math.pi
            Zf = Alfa
            if(Caso == "Caso 1"): # caso segun el rumbo de veta
                if(Rv > Zf and Zf > 0 and Zf < 90): # Antes de Rv
                    Zona = "Zona1"
                elif (Zf > Rv and Zf < 90): # Pasando Rv
                    Zona = "Zona2"
                else: 
                    Zona = "Error al procesar"
            elif (Caso == "Caso 2"):
                if(Zf > 0 and Zf < (90 -Rv)): # Antes de Rv
                    Zona = "Zona1"
                elif (Zf > (90 - Rv) and Zf < 90): # Pasando Rv
                    Zona = "Zona2"
                else: 
                    Zona = "Error al procesar"
    
        elif (cuadrante == "C II"):
            Alfa = math.atan((EF - EEM)/(NEM - NF))*180/math.pi
            Zf = 180 - Alfa

            if(Caso == "Caso 1"):
                if( Alfa > (90-Rv) and Zf < (90 + Rv) and Zf > 90):
                    Zona="Zona3"
                elif (Alfa < (90 - Rv) and Zf > (90 + Rv) and Zf < 180):
                    Zona = "Zona4"
                else:
                    Zona = "Error al procesar"

            if(Caso == "Caso 2"):
                if( Alfa > (Rv) and Zf > 90 and Zf < (180 - Rv)):
                    Zona="Zona3"
                elif (Alfa < Rv and Zf > (180 - Rv) and Zf < 180):
                    Zona = "Zona4"
                else:
                    Zona = "Error al procesar"

        elif (cuadrante == "C III"):
            Alfa = math.atan((EEM - EF)/(NEM - NF))*180/math.pi
            Zf = 180 + Alfa

            if(Caso == "Caso 1"):
                if(Rv > Alfa) and Zf > 180 and Zf < (180 + Rv):
                    Zona="Zona5"
                elif (Alfa > Rv and Zf > (180 + Rv) and Zf < 270):
                    Zona = "Zona6"
                else:
                    Zona = "Error al procesar"

            if(Caso == "Caso 2"):
                if(Alfa < (90 - Rv)) and Zf > (180) and Zf < (270-Rv):
                    Zona="Zona5"
                elif (Alfa > (90 - Rv)) and Zf > (270 - Rv) and Zf < 270:
                    Zona = "Zona6"
                else:
                    Zona = "Error al procesar"

        elif (cuadrante == "C IV"):
            Alfa = math.atan((EEM - EF)/(NF - NEM))*180/math.pi
            Zf = 360 - Alfa
            if(Caso == "Caso 1"):
                if(Alfa > (90- Rv)) and Zf > 270 and Zf < (270 + Rv):
                    Zona="Zona7"
                elif (Alfa < (90 - Rv) and Zf < (360) and Zf > (270 + Rv)):
                    Zona = "Zona8"
                else:
                    Zona = "Error al procesar"

            if(Caso == "Caso 2"):
                if(Alfa > Rv) and Zf > 270 and Zf < (360 - Rv):
                    Zona="Zona7"
                elif (Alfa > 0 and Alfa < (Rv) and Alfa < 90):
                    Zona = "Zona8"
                else:
                    Zona = "Error al procesar"

        respuesta = self.hallar_formato(Zona, DB, Caso)
        return {'Zona':Zona, 'Formato':respuesta}

    def hallar_cuadrante_frente(self, EM, Frente): 
        # Visualizamos en que cuadrante se encuentra el Frente con respecto a EM
        # se recrea un plano cartesiano para saber en que posicion se encuenta el frente colocando a EM como centro del plano cartesiano
        # vease imagen Sistema_Rotafrente.jpg
        
        (EEM, NEM, CEM) = EM
        (EF, NF, CF) = Frente
        cuadrante = None

        if EF > EEM and NF > NEM:   # si se encuentra en la parte superior derecha
            cuadrante = "C I"
        elif EF > EEM and NEM > NF: # si se encuentra en la parte inferior derecha
            cuadrante = "C II"
        elif EEM > EF and NEM > NF: # si se encuentra en la parte inferior Izquierda
            cuadrante = "C III"
        elif EEM > EF and NF > NEM: # si se encuentra en la parte superior Izquierda
            cuadrante = "C IV"
        else:
            cuadrante = "Error al procesar"
        return cuadrante
    
    def hallar_formato(self, Zona, DB, Caso):
        # vease imagen Sistema_Rotafrente.jpg
        formato=None
        if(Caso == "Caso 1"):
            if  ((Zona == "Zona1" or Zona =="Zona8") and DB == "SE"):
                formato="Formato4"
            elif((Zona == "Zona1" or Zona =="Zona8") and DB == "NW"):
                formato="Formato6"
            elif((Zona == "Zona2" or Zona =="Zona3") and DB == "SE"):
                formato="Formato2"
            elif((Zona == "Zona2" or Zona =="Zona3") and DB == "NW"):
                formato="Formato7"    
            elif((Zona == "Zona4" or Zona =="Zona5") and DB == "SE"):
                formato="Formato1"
            elif((Zona == "Zona4" or Zona =="Zona5") and DB == "NW"):
                formato="Formato8" 
            elif((Zona == "Zona6" or Zona =="Zona7") and DB == "SE"):
                formato="Formato3"
            elif((Zona == "Zona6" or Zona =="Zona7") and DB == "NW"):
                formato="Formato5"

        elif(Caso=="Caso 2"):
            if  ((Zona == "Zona1" or Zona =="Zona8") and DB == "SW"):
                formato="Formato11"
            elif((Zona == "Zona1" or Zona =="Zona8") and DB == "NE"):
                formato="Formato14"
            elif((Zona == "Zona2" or Zona =="Zona3") and DB == "SW"):
                formato="Formato12"
            elif((Zona == "Zona2" or Zona =="Zona3") and DB == "NE"):
                formato="Formato13"    
            elif((Zona == "Zona4" or Zona =="Zona5") and DB == "SW"):
                formato="Formato9"
            elif((Zona == "Zona4" or Zona =="Zona5") and DB == "NE"):
                formato="Formato16" 
            elif((Zona == "Zona6" or Zona =="Zona7") and DB == "SW"):
                formato="Formato10"
            elif((Zona == "Zona6" or Zona =="Zona7") and DB == "NE"):
                formato="Formato15"

        return (formato)

    def calcularEP(self, caso, dirBuzamiento, EM, frente, Rv ,buzamiento):
        # caso: se ha calculado en analisisRumboVeta
        # Dirección del buzamiento
        mensaje = None
        EEP = None
        NEP = None
        EF, NF, CF = frente
        EEM, NEM, CEM = EM
        CEP = CF
    
        if (caso == "Caso 1" ) and dirBuzamiento == "SE":
            EEP= EEM+((CEM-CEP)*(math.cos(math.radians(Rv))))/math.tan(math.radians(buzamiento))
            NEP= NEM-((CEM-CEP)*(math.sin(math.radians(Rv))))/math.tan(math.radians(buzamiento))
            return (EEP, NEP, CEP)

        elif (caso == "Caso 1") and dirBuzamiento == "NW":
            EEP= EEM-((CEM-CEP)*(math.cos(math.radians(Rv))))/math.tan(math.radians(buzamiento))
            NEP= NEM+((CEM-CEP)*(math.sin(math.radians(Rv))))/math.tan(math.radians(buzamiento))
            return (EEP, NEP, CEP)
        elif (caso == "Caso 2") and dirBuzamiento == "SW":
            EEP= EEM-((CEM-CEP)*(math.cos(math.radians(Rv))))/math.tan(math.radians(buzamiento))
            NEP= NEM-((CEM-CEP)*(math.sin(math.radians(Rv))))/math.tan(math.radians(buzamiento))
            return (EEP, NEP, CEP)
        elif (caso == "Caso 2" or caso == "Caso 4") and dirBuzamiento == "NE":
            EEP= EEM+((CEM-CEP)*(math.cos(math.radians(Rv))))/math.tan(math.radians(buzamiento))
            NEP= NEM+((CEM-CEP)*(math.sin(math.radians(Rv))))/math.tan(math.radians(buzamiento))
            return (EEP, NEP, CEP)
        else:
            return "Error al procesar"
      
    def Rumbo3D( rumboP,rumboD, zp, zd):
        txtRespuestarumboP = None
        txtRespuestarumboD = None
 
        if(rumboP < 0):
            rumboP = rumboP *(-1)
        if(rumboD < 0):
            rumboD = rumboD *(-1) 
        rumboP= round(rumboP,0)
        rumboD= round(rumboD,0)

        if(zp > 0 and zp < 90):
            RespuestarumboP = f"N{rumboP}°E"
            txtRespuestarumboP="NE"
        elif(zp > 90 and zp < 180):
            RespuestarumboP = f"S{rumboP}°E"
            txtRespuestarumboP = "SE"
        elif(zp > 180 and zp < 270):
            RespuestarumboP = f"S{rumboP}°W"
            txtRespuestarumboP="SW"
        elif(zp > 270 and zp < 360):
            RespuestarumboP = f"N{rumboP}°W"
            txtRespuestarumboP="NW"

        if(zd > 0 and zd < 90):
            RespuestarumboD = f"N{rumboD}°E"
            txtRespuestarumboD="NE"
        elif(zd > 90 and zd < 180):
            RespuestarumboD = f"S{rumboD}°E"
            txtRespuestarumboD="SE"
        elif(zd > 180 and zd < 270):
            RespuestarumboD = f"S{rumboD}°W"
            txtRespuestarumboD = "SW"
        elif(zd > 270 and zd < 360):
            RespuestarumboD = f"N{rumboD}°W"
            txtRespuestarumboD = "NW"
            
        return (RespuestarumboP,txtRespuestarumboP, RespuestarumboD, txtRespuestarumboD)
 
    def RumboEtiquetas2D( rumboP,rumboD, zp, zd):
        
        if(rumboP < 0):
            rumboP = rumboP *(-1)
        if(rumboD < 0):
            rumboD = rumboD *(-1) 
        rumboP= round(rumboP,0)
        rumboD= round(rumboD,0)

        if(zp > 0 and zp < 90): # "NE" 
            RespuestarumboP = 90 - rumboP
        elif(zp > 90 and zp < 180): #"SE"
            RespuestarumboP = 270 + rumboP
        elif(zp > 180 and zp < 270): #"SW"
            RespuestarumboP = 270- rumboP
        elif(zp > 270 and zp < 360): # NW
            RespuestarumboP = 90 + rumboP

        if(zd > 0 and zd < 90): # NE
            RespuestarumboD = 90 - rumboD
        elif(zd > 90 and zd < 180): # SE
            RespuestarumboD = 270 + rumboD
        elif(zd > 180 and zd < 270): # SW
            RespuestarumboD = 270- rumboD
        elif(zd > 270 and zd < 360): # NW
            RespuestarumboD = 90 + rumboD
        return (RespuestarumboP, RespuestarumboD)
    
    def Posicion_Etiqueta(CDP, CDD, distancias): 
        (d1,d2) = distancias
        
        d = (d1+d2)/40
     
        ResuDP = None
        ResuDD = None
        (EDP, NDP, RDp, cuadranteDP) = CDP
        (EDD, NDD, RDD, cuadranteDD) = CDD
        
        if(cuadranteDP == "NE" or cuadranteDP == "SW" ):# I CUADRANTE NE  ó III CUADRANTE SW 
            
            ERDP = EDP - d*math.cos(math.radians(RDp))
            NRDP = NDP + d*math.sin(math.radians(RDp))
            ResuDP =(ERDP, NRDP)
            
        elif(cuadranteDP == "SE" or cuadranteDP == "NW"):# II CUADRANTE SE  ó IV CUADRANTE NW 
           
            ERDP = EDP + d*math.cos(math.radians(RDp))
            NRDP = NDP + d*math.sin(math.radians(RDp))
            ResuDP =(ERDP, NRDP)
        
        if(cuadranteDD == "NE" or cuadranteDD == "SW" ):# I CUADRANTE NE  ó III CUADRANTE SW 
           
            ERDD = EDD + d*math.cos(math.radians(RDD))
            NRDD = NDD - d*math.sin(math.radians(RDD))
            ResuDD =(ERDD, NRDD)
                
        elif(cuadranteDD == "SE" or cuadranteDD == "NW"):# II CUADRANTE SE  ó IV CUADRANTE NW 
            
            ERDD = EDD - d*math.cos(math.radians(RDD))
            NRDD = NDD - d*math.sin(math.radians(RDD))
            ResuDD =(ERDD, NRDD)
        return (ResuDP, ResuDD)
    
    
    def ubicacion_Punto(EM, P2, titulo, Rv, D): # para etiquetar los puntos del 3D
        (EEM, NEM) = EM
        (EP2, NP2) = P2
        porcentajeP2 = None
        porcentajeEM = None
        
        if(titulo == "SW"): #hecho
            if D <= 50:
                porcentajeP2 = 0.62
                porcentajeEM = 0.25
            elif D <= 100:
                porcentajeP2 = 0.30
                porcentajeEM = 0.15
            elif D <= 200:
                porcentajeP2 = 0.17
                porcentajeEM = 0.08
            elif D <= 300:
                porcentajeP2 = 0.15
                porcentajeEM = 0.07
            elif D > 300:
                porcentajeP2 = 0.12
                porcentajeEM = 0.05
                    
        elif(titulo == "NW"): # hecho
            if D <= 50:
                porcentajeP2 = 0.12
                porcentajeEM = 0.20
            elif D <= 100:
                porcentajeP2 = 0.08
                porcentajeEM = 0.13
            elif D <= 300:  # Combines the conditions for D <= 200 and D <= 300
                porcentajeP2 = 0.07
                porcentajeEM = 0.11
            else:  # This will cover the case where D > 300
                porcentajeP2 = 0.08
                porcentajeEM = 0.11
        
        elif(titulo == "NE"): # hecho
            if D <= 50:
                porcentajeP2 = 0.30
                porcentajeEM = 0.80
            elif D <= 100:
                porcentajeP2 = 0.15
                porcentajeEM = 0.40
            elif D <= 200:
                porcentajeP2 = 0.10
                porcentajeEM = 0.30
            elif D <= 300:
                porcentajeP2 = 0.07
                porcentajeEM = 0.18
            else:   
                porcentajeP2 = 0.06
                porcentajeEM = 0.15

        elif(titulo == "SE"): # hecho
            if D <= 50:
                porcentajeP2 = 0.16
                porcentajeEM = 0.25
            elif D <= 100:
                porcentajeP2 = 0.08
                porcentajeEM = 0.18
            elif D <= 200:
                porcentajeP2 = 0.06
                porcentajeEM = 0.13
            elif D <= 300:  # Combines the conditions for D <= 200 and D <= 300
                porcentajeP2 = 0.07
                porcentajeEM = 0.11
            else:  # This will cover the case where D > 300
                porcentajeP2 = 0.05
                porcentajeEM = 0.13

        if(titulo == "SW"):
            ### COORDENADAS DE P2 PARA RUMBOS SW ### 
            EP2e = EP2 - D*math.sin(math.radians(Rv))*porcentajeP2
            NP2e = NP2 - D*math.cos(math.radians(Rv))*porcentajeP2
            
            ### COORDENADAS DE EM PARA RUMBOS NE ###
            EEMe = EEM + D*math.sin(math.radians(Rv))*(porcentajeEM)
            NEMe = NEM + D*math.cos(math.radians(Rv))*(porcentajeEM)
            
        elif(titulo == "NW"):
            ### COORDENADAS DE P2 PARA RUMBOS NW ###
            EP2e = EP2 - D*math.sin(math.radians(Rv))*porcentajeP2
            NP2e = NP2 + D*math.cos(math.radians(Rv))*porcentajeP2
            
            ### COORDENADAS DE EM PARA RUMBOS SE ###
            EEMe = EEM + D*math.sin(math.radians(Rv))*porcentajeEM
            NEMe = NEM - D*math.cos(math.radians(Rv))*porcentajeEM
            
            ### COORDENADAS DE P2 PARA RUMBOS SE ###
                
        elif (titulo == "NE"):
            ### COORDENADAS DE P2 PARA RUMBOS NE ###
            
            EP2e = EP2 + D*math.sin(math.radians(Rv))*(porcentajeP2)
            NP2e = NP2 + D*math.cos(math.radians(Rv))*(porcentajeP2)
            
            ### COORDENADAS DE EM PARA RUMBOS SW ###
            EEMe = EEM - D*math.sin(math.radians(Rv))*porcentajeEM
            NEMe = NEM - D*math.cos(math.radians(Rv))*porcentajeEM
            
        
        elif(titulo == "SE"):
             
            # ESTE DE PDR
            EP2e = EP2 + D*math.sin(math.radians(Rv))*porcentajeP2
            NP2e = NP2 - D*math.cos(math.radians(Rv))*porcentajeP2
            
            ### COORDENADAS DE EM PARA RUMBOS NW ###
            EEMe = EEM - D*math.sin(math.radians(Rv))*porcentajeEM
            NEMe = NEM + D*math.cos(math.radians(Rv))*porcentajeEM
            
        P2e = (EP2e, NP2e) # P2e -> p2 etiqueta
        EMe = (EEMe, NEMe) # EMe -> EM etiqueta
        return (EMe, P2e) # retorna las coordenadas de la etiqueta
   