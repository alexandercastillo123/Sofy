import math
import tkinter as tk
from view.Interface2 import Interface
from Process.RumboVeta import RumboVeta
from Process.GraficoRV import GraficoRV
from Process.GraficoPD import GraficoPD
from Process.Core import Core
import Util.util as util
import os.path
from tkinter import simpledialog
import cv2

_location = os.path.dirname(__file__)

class App(Interface):

    thread = None
    objRumboVeta = None
    objGraficoRV=None
    objGraficoPD=None
    core = None
    caso = None
    titulo = None
    dirBuzamiento = None
    valueDerecha = 'SE'
    valueIzquierda = 'NW'
    respuestaFormato = None
    RespuestaSonido= None
    punto1 = None
    punto2 = None
    frente =None
    EM = None
    EEP = None
    NEP = None
    CEP = None
    EPC = None
    NPC = None
    CPC = None
    Rv = None
    buzamiento = None
    rvLabel = None
    bloque= None
    alto= None
    ancho= None
    Pe= None
    Fe= None
    i= None
    Nd= None
    costopormetro = None
    VozInicio = 0 
    Costo_Proyecto_D_dec = None
    Costo_Proyecto_P_dec = None
    Reproduccion = None
    audio = None
    resultado = None
    Estadodistancia = None
    NDistancia= None
    txtRDp = None
    txtRDD = None
    ERCPerpendicular = None
    NRCPerpendicular = None
    CRCPerpendicular = None
    
    ERCDiagonal = None 
    NRCDiagonal = None 
    textoproceso = None
    
    Sonido = "ON"

    def __init__(self):
        frmPrincipal = tk.Tk()
        super().__init__(frmPrincipal, 'HORUS INTELIGENCIA ARTIFICIAL')
        self.definirEventos()
        self.objRumboVeta = RumboVeta()
        self.objGraficoRV = GraficoRV()
        self.objGraficoPD = GraficoPD()
        self.core = Core()
    
        # Adding video as application startup
        self.play_video(frmPrincipal)

        # Mostrar la ventana principal
        frmPrincipal.update()  # Forzar la actualización de la ventana
        if(self.Sonido =="ON"):
            util.reproducir_audio("Bienvenido.mp3")
   
        frmPrincipal.mainloop()

    def play_video(self, parent):
        # Abrir el video
        cap = cv2.VideoCapture(os.path.join(_location, 'horus_inicio.mp4'))
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            cv2.imshow('Horus Inteligencia Artificial', frame)
            if cv2.waitKey(25) & 0xFF == ord('q'):  # Presiona 'q' para salir del video
                break
        cap.release()
        cv2.destroyAllWindows()


    # Define los eventos de los botones
    def definirEventos(self):
        self.btnProcesar.configure(command=self.procesarRumboVeta) # boton donde se ejecuta el Rumbo de Veta
        self.btnCalcularMontoDP.configure(command=self.calcularCambioProyectoDiagonal) # Calculo de las monedas
        self.btnCalcularMontoPP.configure(command=self.calcularCambioProyectoPerpendicular) # Calculo de las monedas
        self.btnIzquierda.configure(command=self.procesarBuzamientoIz)
        self.btnDerecha.configure(command=self.procesarBuzamientoDer)
        self.btnLimpiar.configure(command=self.limpiarCampos)
        # self.lblSonido.configure(command=self.establecerSonido)
        self.lblSonido.bind("<Button-1>", self.establecerSonido)
        self.Check_PD_Diagonal.configure(command=self.CampospuntoDireccion)
        self.Check_PD_Perpendicular.configure(command=self.CampospuntoDireccion)
        # ----------------------------------------
        self.RB_5m.configure(command=self.puntoDireccion)
        self.RB_7m.configure(command=self.puntoDireccion)
        self.RB_10m.configure(command=self.puntoDireccion)
        self.TNotebook1.bind("<<NotebookTabChanged>>", self.mostrar_mensaje)
    
    def establecerSonido(self, event):
        sonido = self.Sonido
        if(sonido == "ON"):
            self.Sonido = "OFF"
            self.lblSonido.configure(foreground="#eb0214")
        elif(sonido == "OFF"):
            self.Sonido = "ON"
            self.lblSonido.configure(foreground="#008000")
       
    def procesarBuzamientoDer(self):
        if(self.Sonido =="ON"):
            util.reproducir_audio("Resultados.mp3")
        
        self.dirBuzamiento = self.valueDerecha
        self.lblDirBuzamiento.configure(text='Dirección del Buzamiento: ' + self.dirBuzamiento)
        Resultado = self.objRumboVeta.hallar_formato_Caso(self.caso, self.dirBuzamiento,  self.Rv, self.EM, self.frente)
        ResultadoFormato = Resultado['Formato']
        ResultadoZona = Resultado['Zona']
        ResultadoEP = self.objRumboVeta.calcularEP (self.caso, self.dirBuzamiento, self.EM, self.frente, self.Rv, self.buzamiento)
        self.EEP = ResultadoEP[0]
        self.NEP = ResultadoEP[1]
        self.CEP = ResultadoEP[2]
        self.PlayCore(ResultadoFormato, ResultadoZona)  
        
    def procesarBuzamientoIz(self):
        if(self.Sonido =="ON"):
            util.reproducir_audio("Resultados.mp3")
        
        self.dirBuzamiento = self.valueIzquierda
        self.lblDirBuzamiento.configure(text='Dirección del Buzamiento: ' + self.dirBuzamiento)
        Resultado = self.objRumboVeta.hallar_formato_Caso(self.caso, self.dirBuzamiento,  self.Rv, self.EM, self.frente)
        ResultadoFormato = Resultado['Formato']
        ResultadoZona = Resultado['Zona']
        Resultado = self.objRumboVeta.hallar_formato_Caso(self.caso, self.dirBuzamiento,  self.Rv, self.EM, self.frente)
        ResultadoEP = self.objRumboVeta.calcularEP (self.caso, self.dirBuzamiento, self.EM, self.frente, self.Rv, self.buzamiento)
        self.EEP = ResultadoEP[0]
        self.NEP = ResultadoEP[1]
        self.CEP = ResultadoEP[2]
        self.PlayCore(ResultadoFormato, ResultadoZona)

    # Obtiene los datos ingresados de los forumulario
    def obtenerDatos(self):
        try:
            return {
                'EEM': float( util.getValue(self.ingresar_EEM.get()) ),
                'NEM': float( util.getValue(self.ingresar_NEM.get()) ),
                'CEM': float( util.getValue(self.ingresar_CEM.get()) ),
                'NP2': float( util.getValue(self.ingresar_NP2.get()) ),
                'EP2': float( util.getValue(self.ingresar_EP2.get()) ),
                'EF': float( util.getValue(self.ingresar_EF.get()) ),
                'NF': float( util.getValue(self.ingresar_NF.get()) ),
                'CF': float( util.getValue(self.ingresar_CF.get()) ),
                #'RV': float( util.getValue(self.ingresar_rumbo.get()) ),
                'buzamiento': float( util.getValue(self.ingresar_buzamiento.get()) ),
                'alto': float( util.getValue(self.ingresar_alto.get()) ),
                'ancho': float( util.getValue(self.ingresar_ancho.get()) ),
                'Pe': float( util.getValue(self.ingresar_Pe.get()) ),
                'Fe': float( util.getValue(self.ingresar_Fe.get()) ),
                'i': float( util.getValue(self.ingresar_i.get()) ),
                'Nd': float( util.getValue(self.ingresar_Nd.get()) ),
                'costopormetro': float( util.getValue(self.ingresar_costopormetro.get())),
            }
        except ValueError:
            # Manejar la excepción de valor no válido (por ejemplo, cuando se ingresa texto en lugar de un número)
            print('Error: Ingrese un número válido.')
        except Exception as e:
            # Manejar otras excepciones no específicas
            print(f'Se produjo un error: {e}')
        return False

    def BotonesdireccionBuzamiento(self, caso): #cambiarTextButton
        # Determinamos la dirección del buzamiento
        # de acuerdo a la inclinacion de la veta
   
        if caso == 'Caso 1':
            self.valueDerecha = 'SE'
            self.valueIzquierda = 'NW'
        
        elif caso == 'Caso 2':
            self.valueDerecha = 'NE'
            self.valueIzquierda = 'SW'

        self.btnDerecha.configure(text='DERECHA') 
        self.btnIzquierda.configure(text='IZQUIERDA')

    def PlayCore(self, formato, zona):
         
        EP = (self.EEP, self.NEP, self.CEP)  
        seccion =(self.alto, self.ancho)  
        roca =(self.Pe, self.Fe)  
        voladuraCostos =(self.i, self.Nd, self.costopormetro)
        formato_key = f"analisis{formato}"
        
        metodo = getattr(self.core, formato_key, None)
        if metodo is None:
            print(f"Error: {formato_key} no existe en Core")
            return
        
        self.respuestaFormato = metodo(zona, self.punto1, self.punto2, self.frente, EP, self.Rv, self.buzamiento, seccion, roca, voladuraCostos)
        
        if self.respuestaFormato is None:
            print(f"Error: {formato_key} devolvio None (sin datos implementados)")
            return
        
        self.resultadoCampos(self.respuestaFormato)
        PC = (self.respuestaFormato[1])
        (self.EPC, self.NPC, self.CPC) = PC

    def procesarRumboVeta(self):
        
        objDatos = self.obtenerDatos() 
        if objDatos:
            este = objDatos['EEM']
            norte = objDatos['NEM']
            cota = objDatos['CEM']
            este2 = objDatos['EP2']
            norte2 = objDatos['NP2']
            self.buzamiento = objDatos['buzamiento']
            self.frente = (objDatos['EF'], objDatos['NF'], objDatos['CF'])
            self.alto = objDatos['alto']
            self.ancho = objDatos['ancho']
            self.Pe = objDatos['Pe']
            self.Fe = objDatos['Fe']
            self.i = objDatos['i']
            self.Nd = objDatos['Nd']
            self.costopormetro = objDatos['costopormetro']

            # Coordenadas del punto 1
            self.punto1 = (este, norte, cota)
            self.EM = self.punto1

            # Coordenadas del punto 2
            self.punto2 = (este2, norte2)

            # Limpia el frame donde muestra el grafico
            util.limpiarFrame(self.frameCanvas)

            # Instancia la Clase RumboVeta
            self.objGraficoRV.setGrafico(self.frameCanvas)
            azimut = 0

            # Tenemos el punto 1 y luego el punto 2 con coordenadas UTM
            # Calculamos el rumbo de la veta (Rv) segun las coordenadas UTM
            result = self.objRumboVeta.analisisRumboVeta(self.punto1, self.punto2)

            # lleno el texto de los botones
            self.BotonesdireccionBuzamiento(result['caso']) 

            if result:
                self.caso = result['caso']
                azimut = result['azimut']
                self.Rv = result['Rv']
                self.titulo = result['titulo']

            # Arma el grafico
            if self.titulo == "SW":
                self.rvLabel = f"S{round(self.Rv)}°W"
            elif self.titulo == "NE":
                self.rvLabel = f"N{round(self.Rv)}°E"
            elif  self.titulo == "NW":
                self.rvLabel = f"N{round(self.Rv)}°W"
            elif self.titulo == "SE":
                self.rvLabel = f"S{round(self.Rv)}°E"
            self.ingresar_rumbo.delete(0,'end')
            self.ingresar_rumbo.insert(0,self.rvLabel)

            # Armamos el grafico en 2D
            self.objGraficoRV.armarGrafico((este, norte), self.punto2, azimut, self.rvLabel, self.caso, self.frente, self.titulo, self.Rv)

            if(self.Sonido =="ON"):
                util.reproducir_audio("InclinacionVeta.mp3")

    def resultadoCampos(self, resultado):
        if resultado is None:
            print("Error: El formato resuelto no tiene datos de prueba implementados (devuelve None).")
            self.label_resultadoEEP.config(text="N/D")
            self.label_resultadoNEP.config(text="N/D")
            self.label_resultadoCEP.config(text="N/D")
            self.label_resultadoEPC.config(text="N/D")
            self.label_resultadoNPC.config(text="N/D")
            self.label_resultadoCPC.config(text="N/D")
            self.label_resultadoDP.config(text="N/D")
            self.label_resultadoDD.config(text="N/D")
            self.label_resultadoPrNWSE.config(text="N/D")
            self.label_resultadoZPNWSE.config(text="N/D")
            self.label_resultadoAP.config(text="N/D")
            self.label_resultadoVP.config(text="N/D")
            self.label_resultadoVEP.config(text="N/D")
            self.label_resultadoTonP.config(text="N/D")
            self.label_resultadotP.config(text="N/D")
            self.label_resultadoNdP.config(text="N/D")
            self.label_resultadoSdP.config(text="N/D")
            self.label_resultadoDrNWSE.config(text="N/D")
            self.label_azimutD_NWSE.config(text="N/D")
            self.label_resultadoAD.config(text="N/D")
            self.label_resultadoVD.config(text="N/D")
            self.label_resultadoVED.config(text="N/D")
            self.label_resultadoTonD.config(text="N/D")
            self.label_resultadotD.config(text="N/D")
            self.label_resultadoNdD.config(text="N/D")
            self.label_resultadoSdD.config(text="N/D")
            return
        self.resultado = resultado
        cxDiagonal = resultado[0]
        cxPerpendicular = resultado[1]
        distanciaProyecto = resultado[2]
        proyectoPerpendicular = resultado[3]
        proyectoDiagonal = resultado[4]
        puntoAltoE = resultado[5]
        puntoAltoW = resultado[6]
        # -------------------------
        # -------------------------
        puntoBajoE = resultado[7]
        puntoBajoW = resultado[8]
        # -------------------------
        # -------------------------
        
        frente = resultado[9]
        montos = resultado[10]
        casoPizarra = resultado[11]
        resuCaso = resultado[12]
        (EEP_dec, NEP_dec, CEP_dec) = cxDiagonal  ## EP
        (EPC_dec, NPC_dec, CPC_dec) = cxPerpendicular ## PC
        (DP_dec, DD_dec) = distanciaProyecto
        (RDp_dec, ZDp_dec, Area_P_dec, Volumen_P_dec, Volumen_esps_P_dec, Tonelaje_P_dec, Duración_Proyecto_P_dec, Disparos_Proyecto_P_dec,self.Costo_Proyecto_P_dec) =proyectoPerpendicular
        (RDD_dec, ZDD_dec, Area_D_dec, Volumen_D_dec, Volumen_esps_D_dec, Tonelaje_D_dec, Duración_Proyecto_D_dec, Disparos_Proyecto_D_dec, self.Costo_Proyecto_D_dec) = proyectoDiagonal
        Resultado = RumboVeta.Rumbo3D(RDp_dec, RDD_dec, ZDp_dec, ZDD_dec) # rumboP,rumboD, zp, zd
        (RDp_dec, self.txtRDp, RDD_dec, self.txtRDD) = Resultado
        
        # CasoPizarraPorZona, ResuCaso
        if(resuCaso =="Original" or resuCaso =="Caso1" or resuCaso =="Alterno"):
            self.Estadodistancia = "Positivo"

            #.................CONFIGURACIÓN DE LOS LABELS "0".................#
            "Coordenadas Cx Diagonal"
            self.label_resultadoEEP.config(text=round(EEP_dec,1))
            self.label_resultadoNEP.config(text=round(NEP_dec,1))
            self.label_resultadoCEP.config(text=round(CEP_dec,1))
            "Coordenadas Cx Perpendicular"
            self.label_resultadoEPC.config(text=round(EPC_dec,1))
            self.label_resultadoNPC.config(text=round(NPC_dec,1))
            self.label_resultadoCPC.config(text=round(CPC_dec,1))
            "Distancias de Proyectos"
            self.label_resultadoDP.config(text=round(DP_dec,1))
            self.label_resultadoDD.config(text=round(DD_dec,1))
            "Proyecto Perpendicular"
            self.label_resultadoPrNWSE.config(text=RDp_dec)
            self.label_resultadoZPNWSE.config(text=f"{round(ZDp_dec,0)}°")
            self.label_resultadoAP.config(text=round(Area_P_dec,1))
            self.label_resultadoVP.config(text=round(Volumen_P_dec,1))
            self.label_resultadoVEP.config(text=round(Volumen_esps_P_dec,1))
            self.label_resultadoTonP.config(text=round(Tonelaje_P_dec,1))
            self.label_resultadotP.config(text=round(Duración_Proyecto_P_dec,1))
            self.label_resultadoNdP.config(text=round(Disparos_Proyecto_P_dec,1))
            costo_PP = round(self.Costo_Proyecto_P_dec,1)
            costo_PP_Formateado = '{:,.1f}'.format(costo_PP)
            self.label_resultadoSdP.config(text=costo_PP_Formateado)
            "Proyecto Diagonal"
            (PD_EF, PD_NF, PD_CF) = frente
            self.label_resultadoDrNWSE.config(text=RDD_dec)
            self.label_azimutD_NWSE.config(text=f"{round(ZDD_dec,0)}°")
            self.label_resultadoAD.config(text=round(Area_D_dec,1))
            self.label_resultadoVD.config(text=round(Volumen_D_dec,1))
            self.label_resultadoVED.config(text=round(Volumen_esps_D_dec,1))
            self.label_resultadoTonD.config(text=round(Tonelaje_D_dec,1))
            self.label_resultadotD.config(text=round(Duración_Proyecto_D_dec,1))
            self.label_resultadoNdD.config(text=round(Disparos_Proyecto_D_dec,1))
            costo_PD = round(self.Costo_Proyecto_D_dec,1)
            costo_PD_Formateado = '{:,.1f}'.format(costo_PD)
            self.label_resultadoSdD.config(text = costo_PD_Formateado)
            self.Label_PD_EF.config(text = round(PD_EF,1))
            self.Label_PD_NF.config(text = round(PD_NF,1))
            self.Label_PD_PD.config(text=round(DD_dec,1))
            self.Label_PD_PP.config(text=round(DP_dec,1))

        elif(resuCaso =="Caso2" or resuCaso =="Caso3"):
            if(self.Sonido =="ON"):
                 util.reproducir_audio("3D_Negativo.mp3")
            
            self.Estadodistancia ="DP Negativo"
            "Coordenadas Cx Diagonal"
            self.label_resultadoEEP.config(text=round(EEP_dec,1))
            self.label_resultadoNEP.config(text=round(NEP_dec,1))
            self.label_resultadoCEP.config(text=round(CEP_dec,1))
            "Coordenadas Cx Perpendicular"
            self.label_resultadoEPC.config(text=round(EPC_dec,1))
            self.label_resultadoNPC.config(text=round(NPC_dec,1))
            self.label_resultadoCPC.config(text=round(CPC_dec,1))
            "Distancias de Proyectos"
            self.label_resultadoDP.config(text=f"-{round(DP_dec,1)}")
            self.label_resultadoDD.config(text=f"-{round(DD_dec,1)}")
            self.label_resultadoPrNWSE.config(text=RDp_dec)
            self.label_resultadoZPNWSE.config(text=f"{round(ZDp_dec,0)}°")
            "Proyecto Diagonal"
            self.label_resultadoDrNWSE.config(text=RDD_dec)
            self.label_azimutD_NWSE.config(text=f"{round(ZDD_dec,0)}°")
            self.ErrorCampos()

         # Limpia el frame donde muestra el grafico
        util.limpiarFrame(self.frameCanvas3D)
        # Instancia la Clase RumboVeta
        self.objRumboVeta.setGrafico3D(self.frameCanvas3D)
        self.objRumboVeta.visualizar_cuadrado_3d(self.punto1, puntoAltoE, puntoAltoW, puntoBajoE, puntoBajoW, cxPerpendicular,  cxDiagonal,  distanciaProyecto, frente, montos, self.Estadodistancia)
        self.CampospuntoDireccion()

    def puntoDireccion(self):
        
        if(self.selectedButton.get()=="5m"):
            self.NDistancia = 5 
        elif(self.selectedButton.get()=="7m"):
            self.NDistancia = 7
        elif(self.selectedButton.get()=="10m"):
            self.NDistancia = 10
            
        cxDiagonal = self.resultado[0]
        cxPerpendicular = self.resultado[1]
        distanciaProyecto = self.resultado[2]
        proyectoPerpendicular = self.resultado[3]
        proyectoDiagonal = self.resultado[4]
        puntoBajoE = self.resultado[7]
        puntoBajoW = self.resultado[8]
        frente = self.resultado[9]
        (RDp_dec, ZDp_dec, Area_P_dec, Volumen_P_dec, Volumen_esps_P_dec, Tonelaje_P_dec, Duración_Proyecto_P_dec, Disparos_Proyecto_P_dec,self.Costo_Proyecto_P_dec) =proyectoPerpendicular
        (RDD_dec, ZDD_dec, Area_D_dec, Volumen_D_dec, Volumen_esps_D_dec, Tonelaje_D_dec, Duración_Proyecto_D_dec, Disparos_Proyecto_D_dec, self.Costo_Proyecto_D_dec) = proyectoDiagonal
        (DP_dec, DD_dec) = distanciaProyecto
        (EEP_dec, NEP_dec, CEP_dec) = cxDiagonal  ## EP
        (EPC_dec, NPC_dec, CPC_dec) = cxPerpendicular ## PC
        (EPB1, NPB1, CPB1) = puntoBajoE
        (EPB2, NPB2, CPB2) = puntoBajoW
         
        ResultadoContraPerpendicular=self.calcularContra(frente, self.NDistancia, RDp_dec, self.txtRDp)
        (self.ERCPerpendicular, self.NRCPerpendicular) = ResultadoContraPerpendicular
        
        ResultadoContraDiagonal = self.calcularContra(frente, self.NDistancia, RDD_dec, self.txtRDD)
        (self.ERCDiagonal, self.NRCDiagonal) = ResultadoContraDiagonal
        
        ResultadoRumbo = RumboVeta.RumboEtiquetas2D(RDp_dec, RDD_dec, ZDp_dec, ZDD_dec) # rumboP,rumboD, zp, zd
        (RDp_2D, RDD_2D) = ResultadoRumbo
        datos = (DP_dec, DD_dec, RDp_dec, RDD_dec, self.txtRDp, self.txtRDD, ZDp_dec, ZDD_dec)# primas 2 distancias, siguientes el rumbo del texto
        
        # Limpia el frame donde muestra el grafico
        util.limpiarFrame(self.framecanvas2D)
        # Instancia la Clase RumboVeta
        self.objGraficoPD.setGrafico2D(self.framecanvas2D)
        self.objGraficoPD.armarGraficoPuntoDireccion(datos, (EEP_dec, NEP_dec), (EPC_dec, NPC_dec),frente, ResultadoContraDiagonal, ResultadoContraPerpendicular,(EPB1, NPB1),(EPB2, NPB2),self.textoproceso, "")
        if(self.Sonido=="ON"):
            util.reproducir_audio("ColocaEstaca.mp3")
        if(self.textoproceso=="Ambos"):
            self.Label_PD_EPC.config(text = round(EPC_dec,1))
            self.Label_PD_NPC.config(text = round(NPC_dec,1))
            self.Label_ECPP.config(text = int(round(self.ERCPerpendicular)))
            self.Label_NCPP.config(text = int(round(self.NRCPerpendicular)))
            #
            self.Label_PD_EEP.config(text=round(EEP_dec,1))
            self.Label_PD_NEP.config(text=round(NEP_dec,1))
            self.Label_ECPD.config(text=int(round(self.ERCDiagonal)))
            self.Label_NCPD.config(text=int(round(self.NRCDiagonal)))

        elif(self.textoproceso=="Perpendicular"):
            self.Label_PD_EPC.config(text = round(EPC_dec,1))
            self.Label_PD_NPC.config(text = round(NPC_dec,1))
            self.Label_ECPP.config(text = int(round(self.ERCPerpendicular)))
            self.Label_NCPP.config(text = int(round(self.NRCPerpendicular)))
            
            self.Label_PD_EEP.config(text="00.00")
            self.Label_PD_NEP.config(text="00.00")
            self.Label_ECPD.config(text="00.0")
            self.Label_NCPD.config(text="00.0")
            
        elif(self.textoproceso=="Diagonal"):
            self.Label_PD_EEP.config(text=round(EEP_dec,1))
            self.Label_PD_NEP.config(text=round(NEP_dec,1))
            self.Label_ECPD.config(text=int(round(self.ERCDiagonal)))
            self.Label_NCPD.config(text=int(round(self.NRCDiagonal)))
            self.Label_PD_EPC.config(text = 00.00)
            self.Label_PD_NPC.config(text = 00.00)
            self.Label_ECPP.config(text = "00.0")
            self.Label_NCPP.config(text = "00.0")
        else:
            self.Label_PD_EEP.config(text = 00.00)
            self.Label_PD_NEP.config(text = 00.00)
            self.Label_ECPD.config(text = "00.0")
            self.Label_NCPD.config(text = "00.0")
            
            self.Label_PD_EPC.config(text=00.00)
            self.Label_PD_NPC.config(text=00.00)
            self.Label_ECPP.config(text="00.0")
            self.Label_NCPP.config(text="00.0")
    
    def CampospuntoDireccion(self):
        cxDiagonal = self.resultado[0]
        cxPerpendicular = self.resultado[1]
        distanciaProyecto = self.resultado[2]
        proyectoPerpendicular = self.resultado[3]
        proyectoDiagonal = self.resultado[4]
        puntoBajoE = self.resultado[7]
        puntoBajoW = self.resultado[8]
        frente = self.resultado[9]
        

        (DP_dec, DD_dec) = distanciaProyecto
        (EEP_dec, NEP_dec, CEP_dec) = cxDiagonal  ## EP
        (EPC_dec, NPC_dec, CPC_dec) = cxPerpendicular ## PC
        (RDp_dec, ZDp_dec, Area_P_dec, Volumen_P_dec, Volumen_esps_P_dec, Tonelaje_P_dec, Duración_Proyecto_P_dec, Disparos_Proyecto_P_dec,self.Costo_Proyecto_P_dec) =proyectoPerpendicular
        (RDD_dec, ZDD_dec, Area_D_dec, Volumen_D_dec, Volumen_esps_D_dec, Tonelaje_D_dec, Duración_Proyecto_D_dec, Disparos_Proyecto_D_dec, self.Costo_Proyecto_D_dec) = proyectoDiagonal
        (EPB1, NPB1, CPB1) = puntoBajoE
        (EPB2, NPB2, CPB2) = puntoBajoW
        ResultadoRumbo = RumboVeta.RumboEtiquetas2D(RDp_dec, RDD_dec, ZDp_dec, ZDD_dec) # rumboP,rumboD, zp, zd
        (RDp_2D, RDD_2D) = ResultadoRumbo 
        datos = (DP_dec, DD_dec, RDp_dec, RDD_dec, self.txtRDp, self.txtRDD, ZDp_dec, ZDD_dec)
        if(self.Operacion_Perpendicular.get()=="Operacion_Perpendicular"):
            self.Label_PD_EPC.config(text=round(EPC_dec,0))
            self.Label_PD_NPC.config(text=round(NPC_dec,0))
            
        else:
            self.Label_PD_EPC.config(text="00.00")
            self.Label_PD_NPC.config(text="00.00")
            self.Label_ECPP.config(text="00.0")
            self.Label_NCPP.config(text="00.0")
           
        if(self.Operacion_Diagonal.get()=="Operacion_Diagonal"):
            self.Label_PD_EEP.config(text=round(EEP_dec,0))
            self.Label_PD_NEP.config(text=round(NEP_dec,0))
            
        else:
            self.Label_PD_EEP.config(text="00.00")
            self.Label_PD_NEP.config(text="00.00")
            self.Label_ECPD.config(text="00.0")
            self.Label_NCPD.config(text="00.0")
            
        if(self.Operacion_Perpendicular.get()=="Operacion_Perpendicular" and self.Operacion_Diagonal.get()=="Operacion_Diagonal"):
            self.textoproceso="Ambos"
            # Limpia el frame donde muestra el grafico
            util.limpiarFrame(self.framecanvas2D)
            # Instancia la Clase RumboVeta
            self.objGraficoPD.setGrafico2D(self.framecanvas2D)
            self.objGraficoPD.armarGraficoPuntoDireccion(datos, (EEP_dec, NEP_dec), (EPC_dec, NPC_dec),frente, (00.00 , 00.00), (00.00 , 00.00),(EPB1, NPB1),(EPB2, NPB2),"", "Ambos")
  
            
        elif(self.Operacion_Perpendicular.get()=="Operacion_Perpendicular"):
            self.textoproceso="Perpendicular"
            # Limpia el frame donde muestra el grafico
            util.limpiarFrame(self.framecanvas2D)
            # Instancia la Clase RumboVeta
            self.objGraficoPD.setGrafico2D(self.framecanvas2D)
            self.objGraficoPD.armarGraficoPuntoDireccion(datos, (EEP_dec, NEP_dec), (EPC_dec, NPC_dec),frente, (00.00 , 00.00), (00.00 , 00.00),(EPB1, NPB1),(EPB2, NPB2), "", "PC")
  
        elif(self.Operacion_Diagonal.get()=="Operacion_Diagonal"):
            self.textoproceso="Diagonal"
            # Limpia el frame donde muestra el grafico
            util.limpiarFrame(self.framecanvas2D)
            # Instancia la Clase RumboVeta
            self.objGraficoPD.setGrafico2D(self.framecanvas2D)
            self.objGraficoPD.armarGraficoPuntoDireccion(datos, (EEP_dec, NEP_dec), (EPC_dec, NPC_dec),frente, (00.00 , 00.00), (00.00 , 00.00),(EPB1, NPB1),(EPB2, NPB2), "", "EP")
        else:
            self.textoproceso="Ninguno"
            # Limpia el frame donde muestra el grafico
            util.limpiarFrame(self.framecanvas2D)
            # Instancia la Clase RumboVeta
            self.objGraficoPD.setGrafico2D(self.framecanvas2D)
            self.objGraficoPD.armarGraficoPuntoDireccion(datos,(EEP_dec, NEP_dec), (EPC_dec, NPC_dec),frente, (00.00 , 00.00), (00.00 , 00.00),(EPB1, NPB1),(EPB2, NPB2), "", "Ninguno")
    
    def calcularContra(self,  frente, d, R, Rumbo):
        (EF, NF, CF) = frente
        EC = None
        NC = None
        CC = None
    
        if(Rumbo=="SW"):
            # RUMBO NE
            #ESTE
            EC = EF + d*math.sin(math.radians(R))
            #NORTE
            NC = NF + d*math.cos(math.radians(R))
            #COTA
            CC = CF
        elif(Rumbo=="NW"):
            # RUMBO SE
            #ESTE
            EC = EF + d*math.sin(math.radians(R))
            #NORTE
            NC = NF - d*math.cos(math.radians(R))
            #COTA
            CC = CF
        elif(Rumbo=="NE"):             
            # α = rumbo RDp o RDD, dependiendo del proyecto
            # RUMBO SW
            #ESTE
            EC = EF - d*math.sin(math.radians(R))
            #NORTE
            NC = NF - d*math.cos(math.radians(R))
            #COTA
            CC = CF
        elif(Rumbo=="SE"):
            # RUMBO NW
            #ESTE
            EC = EF - d*math.sin(math.radians(R))
            #NORTE
            NC = NF + d*math.cos(math.radians(R))
            #COTA
            CC = CF
     
        return (EC, NC)

    def limpiarCampos(self):
        self.ingresar_alto.delete(0, tk.END)
        self.ingresar_ancho.delete(0, tk.END)
        self.ingresar_EEM.delete(0, tk.END)
        self.ingresar_NEM.delete(0, tk.END)
        self.ingresar_CEM.delete(0, tk.END)
        self.ingresar_NP2.delete(0, tk.END)
        self.ingresar_EP2.delete(0, tk.END)
        self.ingresar_EF.delete(0, tk.END)
        self.ingresar_NF.delete(0, tk.END)
        self.ingresar_CF.delete(0, tk.END)
        self.ingresar_rumbo.delete(0, tk.END)
        self.ingresar_buzamiento.config(validate="none")
        self.ingresar_buzamiento.delete(0, tk.END)
        # Reactivar validación
        self.ingresar_buzamiento.config(validate="key")
        self.ingresar_alto.delete(0, tk.END)
        self.ingresar_ancho.delete(0, tk.END)
        self.ingresar_Pe.delete(0, tk.END)
        self.ingresar_Fe.delete(0, tk.END)
        self.ingresar_i.delete(0, tk.END)
        self.ingresar_Nd.delete(0, tk.END)
        self.ingresar_costopormetro.delete(0, tk.END)

         #.................CONFIGURACIÓN DE LOS LABELS "0".................#
        "Coordenadas Cx Diagonal"
        self.label_resultadoEEP.config(text="00.00")
        self.label_resultadoNEP.config(text="00.00")
        self.label_resultadoCEP.config(text="00.00")
        "Coordenadas Cx Perpendicular"
        self.label_resultadoEPC.config(text="00.00")
        self.label_resultadoNPC.config(text="00.00")
        self.label_resultadoCPC.config(text="00.00")
        "Distancias de Proyectos"
        self.label_resultadoDP.config(text="00.00")
        self.label_resultadoDD.config(text="00.00")
        "Proyecto Perpendicular"
        self.label_resultadoPrNWSE.config(text="0°")
        self.label_resultadoZPNWSE.config(text="0°")
        self.label_resultadoAP.config(text="00.00")
        self.label_resultadoVP.config(text="00.00")
        self.label_resultadoVEP.config(text="00.00")
        self.label_resultadoTonP.config(text="00.00")
        self.label_resultadotP.config(text="00.00")
        self.label_resultadoNdP.config(text="00.00")
        self.label_resultadoSdP.config(text="00.00")
        "Proyecto Diagonal"
        self.label_resultadoDrNWSE.config(text="0°")
        self.label_azimutD_NWSE.config(text="0°")
        self.label_resultadoAD.config(text="00.00")
        self.label_resultadoVD.config(text="00.00")
        self.label_resultadoVED.config(text="00.00")
        self.label_resultadoTonD.config(text="00.00")
        self.label_resultadotD.config(text="00.00")
        self.label_resultadoNdD.config(text="00.00")
        self.label_resultadoSdD.config(text="00.00")

    def ErrorCampos(self):
        #.................CONFIGURACIÓN DE LOS LABELS "0".................#
        "Proyecto Perpendicular"
        self.label_resultadoAP.config(text="00.00")
        self.label_resultadoVP.config(text="00.00")
        self.label_resultadoVEP.config(text="00.00")
        self.label_resultadoTonP.config(text="00.00")
        self.label_resultadotP.config(text="00.00")
        self.label_resultadoNdP.config(text="00.00")
        self.label_resultadoSdP.config(text="00.00")
        "Proyecto Diagonal"
        self.label_resultadoAD.config(text="00.00")
        self.label_resultadoVD.config(text="00.00")
        self.label_resultadoVED.config(text="00.00")
        self.label_resultadoTonD.config(text="00.00")
        self.label_resultadotD.config(text="00.00")
        self.label_resultadoNdD.config(text="00.00")
        self.label_resultadoSdD.config(text="00.00")

    def calcularCambioProyectoDiagonal(self):

        seleccion = self.cboMonedaPD.get()
        if(seleccion=="Soles"):
            montoS=round(self.Costo_Proyecto_D_dec,1)
            Soles_formateado = '{:,.1f}'.format(montoS)
            self.label_resultadoSdD.config(text=Soles_formateado)
            self.TLabel28.config(text="S/.")
        elif(seleccion=="Dólares"):
            montoD = self.Costo_Proyecto_D_dec
            cambioD = simpledialog.askfloat("Ingresar monto", "Ingrese el cambio en dólares:")
            dolares = montoD / cambioD
            Dolar_formateado = '{:,.1f}'.format(dolares)
            self.label_resultadoSdD.config(text=Dolar_formateado)
            self.TLabel28.config(text="$")
        elif(seleccion=="Euros"):
            montoE = self.Costo_Proyecto_D_dec
            cambioE = simpledialog.askfloat("Ingresar monto", "Ingrese el camnbio en Euros:")
            euros= montoE / cambioE
            euros_formateado = '{:,.1f}'.format(euros)
            self.label_resultadoSdD.config(text=euros_formateado)
            self.TLabel28.config(text="€")
            
    def calcularCambioProyectoPerpendicular(self):
        seleccion = self.cboMonedaPP.get()
        if(seleccion=="Soles"):
            montoS=round(self.Costo_Proyecto_P_dec,1)
            Soles_formateado = '{:,.1f}'.format(montoS)
            self.label_resultadoSdP.config(text=Soles_formateado)
            self.lblSdineropp.config(text="S/.")
        elif(seleccion=="Dólares"):
            montoD = self.Costo_Proyecto_P_dec
            cambioD = simpledialog.askfloat("Ingresar monto", "Ingrese el cambio en dólares:")
            dolares = montoD / cambioD
            Dolar_formateado = '{:,.1f}'.format(dolares)
            self.label_resultadoSdP.config(text=Dolar_formateado)
            self.lblSdineropp.config(text="$")
        elif(seleccion=="Euros"):
            montoE = self.Costo_Proyecto_P_dec
            cambioE = simpledialog.askfloat("Ingresar monto", "Ingrese el camnbio en Euros:")
            euros= montoE / cambioE
            euros_formateado = '{:,.1f}'.format(euros)
            self.label_resultadoSdP.config(text=euros_formateado)
            self.lblSdineropp.config(text="€")
        
    def mostrar_mensaje(self, event):
        try:
            selected_tab = event.widget.select()
            tab_text = event.widget.tab(event.widget.index(selected_tab), "text")
            if tab_text == "Punto de Dirección":
                if(self.Sonido =="ON"):
                    util.reproducir_audio("seleccionProyecto.mp3")
        except tk.TclError:
            pass  # Manejar la excepción si el evento se produce antes de que se configure el Notebook          
 
if __name__ == '__main__':
    # Inicia la aplicación
    app = App()
