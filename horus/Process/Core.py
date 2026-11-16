import math
import matplotlib.pyplot as plt

class Core:
    
    def analisisFormato1(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
         
        #VARIABLES DE ENTRADA: 
        zona = "Zona4" 
        punto1 = (188741.0, 9106426.0, 4245.0) 
        punto2 = (188696.0, 9106369.0) 
        frente = (188899.0, 9106271.0, 3800.0) 
        EP = (190721.82465462195, 9104862.191062141, 3800.0) 
        Rv = 38.290163192243064 
        buzamiento = 10.0 
        seccion = (2.0, 2.0) 
        roca = (2.7, 1.3) 
        voladuraCostos = (1.0, 2.0, 2000.0)
        
        #RESULTADOS
        cxDiagonal = (190721.82465462195, 9104862.191062141, 3800.0) 
        cxPerpendicular = (190707.1062245875, 9104843.547717432, 3800.0) 
        distanciaProyecto = (2303.6640680454607, 2303.7865232890886) 
        proyectoPerpendicular = (51.709836807756936, 128.29016319224306, 3.6780972450961724, 8473.10046230505, 11015.030600996566, 22877.371248223637, 1151.8320340227303, 2303.6640680454607, 4607328.136090921) 
        proyectoDiagonal = (52.300591433035905, 127.6994085669641, 3.6780972450961724, 8473.550864599285, 11015.616123979073, 22878.587334418073, 1151.8932616445443, 2303.7865232890886, 4607573.046578177) 
        puntoAltoE = (188745.46013031338, 9106431.649498397, 4245.0) 
        puntoAltoW = (188721.8214396525, 9106401.707156893, 4245.0) 
        puntoBajoE = (190726.28478493533, 9104867.840560539, 3800.0) 
        puntoBajoW = (190702.64609427445, 9104837.898219034, 3800.0) 
        frente = (188899.0, 9106271.0, 3800.0) 
        montos = (4607328.136090921, 4607573.046578177) 
        CasoPizarraPorZona = None 
        ResuCaso = "Caso3"
        
        return (cxDiagonal, cxPerpendicular, distanciaProyecto, proyectoPerpendicular, proyectoDiagonal, puntoAltoE, puntoAltoW,  puntoBajoE, puntoBajoW, frente, montos, CasoPizarraPorZona, ResuCaso)
         
    def analisisFormato2(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):

        
        #VARIABLES DE ENTRADA: 
        zona = "Zona2" 
        punto1 = (188741.0, 9106426.0, 4245.0) 
        punto2 = (188788.0, 9106479.0) 
        frente = (189136.0, 9106475.0, 3800.0) 
        EP = (190629.21646824537, 9104751.54388665, 3800.0) 
        Rv = 41.56636963754948 
        buzamiento = 10.0 
        seccion = (2.0, 2.0) 
        roca = (2.7, 1.3) 
        voladuraCostos = (1.0, 2.0, 2000.0) 
        
        #RESULTADOS
        cxDiagonal = (190629.21646824537, 9104751.54388665, 3800.0) 
        cxPerpendicular = (190827.4257149572, 9104975.056441452, 3800.0) 
        distanciaProyecto = (2260.697155314032, 2280.3500598990177) 
        proyectoPerpendicular = (48.43363036245052, 131.56636963754949, 3.6780972450961724, 8315.063978957294, 10809.583172644485, 22450.672743184696, 1130.348577657016, 2260.697155314032, 4521394.310628064) 
        proyectoDiagonal = (40.90592442091536, 139.09407557908463, 3.6780972450961724, 8387.349273169468, 10903.55405512031, 22645.843037557566, 1140.1750299495088, 2280.3500598990177, 4560700.119798035) 
        puntoAltoE = (188999.27265480589, 9106717.243632015, 4245.0) 
        puntoAltoW = (188680.9365919056, 9106358.268922787, 4245.0) 
        puntoBajoE = (190887.48912305126, 9105042.787518665, 3800.0) 
        puntoBajoW = (190569.15306015097, 9104683.812809438, 3800.0) 
        frente = (189136.0, 9106475.0, 3800.0) 
        montos = (4521394.310628064, 4560700.119798035) 
        CasoPizarraPorZona = None 
        ResuCaso = "Caso3"
        
        return (cxDiagonal, cxPerpendicular, distanciaProyecto, proyectoPerpendicular, proyectoDiagonal, puntoAltoE, puntoAltoW,  puntoBajoE, puntoBajoW, frente, montos, CasoPizarraPorZona, ResuCaso)
      
    def analisisFormato3(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        print("sin datos de prueba")
        return None
         
    def analisisFormato4(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        print("sin datos de prueba")
        return None
           
    def analisisFormato5(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        print("sin datos de prueba")
        return None
          
    def analisisFormato6(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        print("sin datos de prueba")
        return None
            
    def analisisFormato7(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        
        #VARIABLES DE ENTRADA: 
        zona = "Zona2" 
        punto1 = (188741.0, 9106426.0, 4245.0) 
        punto2 = (188788.0, 9106479.0) 
        frente = (189136.0, 9106475.0, 3800.0) 
        EP = (188461.62722458848, 9106673.745668761, 3800.0) 
        Rv = 41.56636963754948 
        buzamiento = 50.0 
        seccion = (2.0, 2.0) 
        roca = (2.7, 1.3) 
        voladuraCostos = (1.0, 2.0, 2000.0) 
       
       #RESULTADOS
        cxDiagonal = (188461.62722458848, 9106673.745668761, 3800.0) 
        cxPerpendicular = (188659.8364713002, 9106897.258223563, 3800.0) 
        distanciaProyecto = (636.4225902898818, 703.0494158077875) 
        proyectoPerpendicular = (48.43363036245052, 311.5663696375495, 3.6780972450961724, 2340.824176062184, 3043.0714288808394, 6320.225275367898, 318.2112951449409, 636.4225902898818, 1272845.1805797636) 
        proyectoDiagonal = (73.57912839761045, 286.4208716023895, 3.6780972450961724, 2585.8841194490965, 3361.6493552838256, 6981.88712251256, 351.5247079038937, 703.0494158077875, 1406098.831615575) 
        puntoAltoE = (188999.2726548058, 9106717.243632015, 4245.0) 
        puntoAltoW = (188680.93659190563, 9106358.268922787, 4245.0) 
        puntoBajoE = (188719.89987939427, 9106964.989300776, 3800.0) 
        puntoBajoW = (188401.5638164941, 9106606.014591549, 3800.0) 
        frente = (189136.0, 9106475.0, 3800.0) 
        montos = (1272845.1805797636, 1406098.831615575) 
        CasoPizarraPorZona = None 
        ResuCaso = "Original"
       
        return (cxDiagonal, cxPerpendicular, distanciaProyecto, proyectoPerpendicular, proyectoDiagonal, puntoAltoE, puntoAltoW,  puntoBajoE, puntoBajoW, frente, montos, CasoPizarraPorZona, ResuCaso)
         
    def analisisFormato8(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        
        #VARIABLES DE ENTRADA: 
        zona = "Zona4" 
        punto1 = (188741.0, 9106426.0, 4245.0) 
        punto2 = (188696.0, 9106369.0) 
        frente = (188899.0, 9106271.0, 3800.0) 
        EP = (188324.75284926256, 9106754.616171636, 3800.0) 
        Rv = 38.290163192243064 
        buzamiento = 40.0 
        seccion = (2.0, 2.0) 
        roca = (2.7, 1.3) 
        voladuraCostos = (1.0, 2.0, 2000.0)
      
        #RESULTADOS
        cxDiagonal = (188324.75284926256, 9106754.616171636, 3800.0) 
        cxPerpendicular = (188310.034419228, 9106735.972826926, 3800.0) 
        distanciaProyecto = (750.3866903889996, 750.7625400868308) 
        proyectoPerpendicular = (51.709836807756936, 308.2901631922431, 3.6780972450961724, 2759.9952186766136, 3587.993784279598, 7451.987090426857, 375.1933451944998, 750.3866903889996, 1500773.380777999) 
        proyectoDiagonal = (49.896779401265846, 310.10322059873414, 3.6780972450961724, 2761.377630414777, 3589.7909195392103, 7455.719602119899, 375.3812700434154, 750.7625400868308, 1501525.0801736615) 
        puntoAltoE = (188745.46013031338, 9106431.649498397, 4245.0) 
        puntoAltoW = (188721.82143965244, 9106401.707156893, 4245.0) 
        puntoBajoE = (188329.21297957594, 9106760.265670033, 3800.0) 
        puntoBajoW = (188305.574288915, 9106730.323328529, 3800.0) 
        frente = (188899.0, 9106271.0, 3800.0) 
        montos = (1500773.380777999, 1501525.0801736615) 
        CasoPizarraPorZona = None 
        ResuCaso = "Original"
        
        return (cxDiagonal, cxPerpendicular, distanciaProyecto, proyectoPerpendicular, proyectoDiagonal, puntoAltoE, puntoAltoW,  puntoBajoE, puntoBajoW, frente, montos, CasoPizarraPorZona, ResuCaso)
         
    def analisisFormato9(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        
        #VARIABLES DE ENTRADA: 
        zona = "Zona4" 
        punto1 = (188478.0, 9106726.0, 4297.0) 
        punto2 = (188562.0, 9106649.0) 
        frente = (188545.0, 9106336.0, 4197.0) 
        EP = (188094.77751992215, 9106307.939112643, 4197.0) 
        Rv = 47.48955292199915 
        buzamiento = 10.0 
        seccion = (2.0, 2.0) 
        roca = (2.7, 1.3) 
        voladuraCostos = (1.0, 2.0, 2000.0) 
         
        #RESULTADO 
        cxDiagonal = (188094.77751992215, 9106307.939112643, 4197.0) 
        cxPerpendicular = (188325.4492180356, 9106096.490056038, 4197.0) 
        distanciaProyecto = (324.9116173938446, 451.0961039143701) 
        proyectoPerpendicular = (42.51044707800085, 222.51044707800085, 3.6780972450961724, 1195.0565248360415, 1553.573482286854, 3226.652617057312, 162.4558086969223, 324.9116173938446, 649823.2347876892) 
        proyectoDiagonal = (86.4335557056026, 266.4335557056026, 3.6780972450961724, 1659.1753370810613, 2156.9279382053796, 4479.773410118866, 225.54805195718504, 451.0961039143701, 902192.2078287401) 
        puntoAltoE = (188778.57221269383, 9106450.475471698, 4297.0) 
        puntoAltoW = (188408.09948542004, 9106790.075471697, 4297.0) 
        puntoBajoE = (188395.34973261598, 9106032.41458434, 4197.0) 
        puntoBajoW = (188024.8770053422, 9106372.01458434, 4197.0) 
        frente = (188545.0, 9106336.0, 4197.0) 
        montos = (649823.2347876892, 902192.2078287401) 
        CasoPizarraPorZona = None 
        ResuCaso = "Caso3"
         
        return (cxDiagonal, cxPerpendicular, distanciaProyecto, proyectoPerpendicular, proyectoDiagonal, puntoAltoE, puntoAltoW,  puntoBajoE, puntoBajoW, frente, montos, CasoPizarraPorZona, ResuCaso)
         
    def analisisFormato10(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        print("sin datos de prueba")
        return None
    
    def analisisFormato11(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        print("sin datos de prueba")
        return None
         
    def analisisFormato12(self, zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        print("sin datos de prueba")
        return None
         
    def analisisFormato13(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        print("sin datos de prueba")
        return None
         
    def analisisFormato14(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        print("sin datos de prueba")
        return None
         
    def analisisFormato15(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        print("sin datos de prueba")
        return None
         
    def analisisFormato16(self,zona, punto1, punto2, frente, EP, Rv, buzamiento, seccion, roca, voladuraCostos):
        
       #VARIABLES DE ENTRADA: 
        zona= "Zona4" 
        punto1 = (188478.0, 9106726.0, 4297.0) 
        punto2 = (188562.0, 9106649.0) 
        frente = (188545.0, 9106336.0, 4197.0) 
        EP = (188550.4625948215, 9106805.05010344, 4197.0) 
        Rv = 47.48955292199915 
        buzamiento = 43.0
        seccion = (2.0, 2.0) 
        roca = (2.7, 1.3) 
        voladuraCostos = (1.0, 2.0, 2000.0)
        
        #RESULTADOS
        cxDiagonal = (188550.4625948215, 9106805.05010344, 4197.0) 
        cxPerpendicular = (188781.13429293432, 9106593.601046838, 4197.0) 
        distanciaProyecto = (349.4534355695275, 469.08191126932707) 
        proyectoPerpendicular = (42.51044707800085, 42.51044707800085, 3.6780972450961724, 1285.323718657672, 1670.9208342549737, 3470.3740403757142, 174.72671778476376, 349.4534355695275, 698906.871139055) 
        proyectoDiagonal = (0.6672410414270221, 0.6672410414270221, 3.6780972450961724, 1725.328885564159, 2242.9275512334066, 4658.38799102323, 234.54095563466353, 469.08191126932707, 938163.8225386541) 
        puntoAltoE = (188778.5722126922, 9106450.4754717, 4297.0) 
        puntoAltoW = (188408.09948542042, 9106790.075471697, 4297.0) 
        puntoBajoE = (188851.0348075137, 9106529.52557514, 4197.0) 
        puntoBajoW = (188480.5620802419, 9106869.125575138, 4197.0) 
        frente = (188545.0, 9106336.0, 4197.0) 
        montos = (698906.871139055, 938163.8225386541) 
        CasoPizarraPorZona = None 
        ResuCaso = "Original"
  
        return (cxDiagonal, cxPerpendicular, distanciaProyecto, proyectoPerpendicular, proyectoDiagonal, puntoAltoE, puntoAltoW,  puntoBajoE, puntoBajoW, frente, montos, CasoPizarraPorZona, ResuCaso)
         
    def rasanteDelFrente(self, Formato, Zona, frente, EP, PC): # Me determina que caso corresponde segun pizarra
        # Cada analisis de formato corresponde a una zona
        print("Formato ",Formato )
        print("frente ",frente)
        print("EP " ,EP)
        print("PC ",PC)
        (EF, NF, CF) =frente
        (EEP, NEP, CEP) = EP
        (EPC, NPC, CPC) = PC
        Caso = None

        if(Formato == "Formato1"):
            if(EF < EEP and EF > EPC and NF < NEP and NF < NPC):
                 Caso = "Original"
            elif(EF > EEP and EF > EPC and NF < NEP and NF < NPC ):
                Caso = "Caso1" #"Caso3"
            elif(EF < EEP and EF < EPC and NF < NEP and NF > NPC):
                Caso = "Caso2" #"Caso1"
            elif(EF < EEP and EF < EPC and NF > NEP and NF > NPC):
                Caso = "Caso3" # "Caso2"
            
        elif(Formato == "Formato2"): 
            if(EF > EEP and EF > EPC and NF < NEP and NF < NPC):
                 Caso = "Original"
            elif(EF > EEP and EF > EPC and NF > NEP and NF < NPC ):
                Caso = "Caso1" 
            elif(EF > EEP and EF < EPC and NF > NEP and NF > NPC):
                Caso = "Caso2" 
            elif(EF < EEP and EF < EPC and NF > NEP and NF > NPC):
                Caso = "Caso3" 
                
        elif(Formato == "Formato3"): 
            if(EF < EEP and EF < EPC and NF > NEP and NF > NPC):
                 Caso = "Original"
            elif(EF < EEP and EF < EPC and NF < NEP and NF > NPC ):
                Caso = "Alterno" 
        
        elif(Formato == "Formato4"): 
            if(EF < EEP and EF < EPC and NF > NEP and NF > NPC):
                 Caso = "Original"
            elif(EF > EEP and EF < EPC and NF > NEP and NF > NPC ):
                Caso = "Alterno" 
        
        elif(Formato == "Formato5"):
            if(EF < EEP and EF < EPC and NF > NEP and NF > NPC):
                 Caso = "Original"
            elif(EF < EEP and EF < EPC and NF < NEP and NF > NPC):
                Caso = "Caso1"
            elif(EF < EEP and EF > EPC and NF < NEP and NF < NPC):
                Caso = "Caso2"
            elif(EF > EEP and EF > EPC and NF < NEP and NF < NPC ):
                Caso = "Caso3"
            
        elif(Formato == "Formato6"):
            if(EF > EEP and EF < EPC and NF > NEP and NF > NPC):
                 Caso = "Original"
            elif(EF < EEP and EF < EPC and NF > NEP and NF > NPC):
                Caso = "Caso1"
            elif(EF > EEP and EF > EPC and NF > NEP and NF < NPC):
                Caso = "Caso2"
            elif(EF > EEP and EF > EPC and NF < NEP and NF < NPC ):
                Caso = "Caso3"
                
        elif(Formato == "Formato7"):
            if(EF > EEP and EF > EPC and NF < NEP and NF < NPC):
                 Caso = "Original"
            elif(EF > EEP and EF > EPC and NF > NEP and NF < NPC):
                Caso = "Alterno"
        
        elif(Formato == "Formato8"):
            if(EF > EEP and EF > EPC and NF < NEP and NF < NPC):
                 Caso = "Original"
            elif(EF < EEP and EF > EPC and NF < NEP and NF < NPC):
                Caso = "Alterno"
                
        if(Formato == "Formato9"):
            if(EF < EEP and EF < EPC and NF < NEP and NF < NPC):
                 Caso = "Original"
            elif(EF > EEP and EF < EPC and NF < NEP and NF < NPC):
                Caso = "Caso1"
            elif(EF > EEP and EF > EPC and NF < NEP and NF > NPC):
                Caso = "Caso2"
            elif(EF > EEP and EF > EPC and NF > NEP and NF > NPC ):
                Caso = "Caso3"

        elif(Formato == "Formato10"):
            if  (EF < EEP and EF < EPC and NF < NEP and NF < NPC):
                Caso = "Alterno"
            elif(EF < EEP and EF < EPC and NF > NEP and NF < NPC):
                Caso = "Original"
            elif(EF < EEP and EF > EPC and NF > NEP and NF > NPC):
                Caso = "Caso1"
            elif(EF > EEP and EF > EPC and NF > NEP and NF > NPC ):
                Caso = "Caso2"
                
        elif(Formato == "Formato11"):
            if  (EF < EEP and EF > EPC and NF > NEP and NF > NPC):
                Caso = "Alterno"
            elif(EF > EEP and EF > EPC and NF > NEP and NF > NPC):
                Caso = "Original"
                
        elif(Formato == "Formato12"):
            if  (EF > EEP and EF > EPC and NF > NEP and NF > NPC):
                Caso = "Alterno"
            elif(EF > EEP and EF > EPC and NF < NEP and NF > NPC):
                Caso = "Original"
                
        elif(Formato == "Formato13"):
            if   (EF > EEP and EF > EPC and NF > NEP and NF > NPC): # Caso Pizarra 
                Caso = "Original"
            elif (EF > EEP and EF > EPC and NEP > NF and NF > NPC): # Caso Pizarra
                Caso = "Caso1"
            elif (EF > EEP and EPC > EF and NEP > NF and NPC > NF): # Caso Pizarra
                Caso = "Caso2"
            elif (EEP > EF and EPC > EF and NEP > NF and NPC > NF):# Caso Pizarra
                Caso = "Caso3"

        elif(Formato == "Formato14"):
            if   (EF > EEP and NF > NEP and EF > EPC and NF > NPC): # Caso Pizarra Original
                Caso = "Original"
            elif (EF < EEP and NF > NEP and EF > EPC and NF > NPC): # Caso Pizarra
                Caso = "Caso1"    
            elif (EF < EEP and NF > NEP and EF < EPC and NF < NPC):
                Caso="Caso2"
            elif (EF < EEP and NF < NEP and EF < EPC and NF < NPC ):
                Caso = "Caso3"
                
        elif(Formato == "Formato15"):
            if   (EF < EEP and NF > NEP and EF < EPC and NF < NPC): # Caso Pizarra Original
                Caso = "Original"
            elif (EF < EEP and NF < NEP and EF < EPC and NF < NPC): # Caso Pizarra
                Caso = "Alterno"
                
        elif(Formato == "Formato16"):
            if   (EF < EEP and NF < NEP and EF < EPC and NF < NPC): # Caso Pizarra Original
                Caso = "Original"
            elif (EF > EEP and NF < NEP and EF < EPC and NF < NPC): # Caso Pizarra
                Caso = "Alterno"
                
        return (Caso)